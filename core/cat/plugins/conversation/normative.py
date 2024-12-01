from cat.mad_hatter.decorators import hook
import langchain
from langchain.docstore.document import Document
from cat.log import log
from enum import Enum
import json
from supabase import create_client, Client
from langchain.document_loaders.parsers.language.language_parser import LanguageParser
from langchain.document_loaders.parsers.msword import MsWordParser
import os
from .parsers import ConvertParser

@hook  # default priority = 1
def before_cat_sends_message(message, cat):
    # use the LLM to rephrase the Cat's answer
    print("Questo è il message:", message[0])
    #message["content"] = 

    return message
 
@hook
def rabbithole_instantiates_parsers(file_handlers: dict, cat) -> dict:
    # Aggiunta di ConvertParser per PDF
    new_handlers = {
        "application/pdf": ConvertParser()  # Aggiunto ConvertParser per gestire i file PDF
    }
     
    file_handlers = file_handlers | new_handlers
    return file_handlers

@hook
def before_rabbithole_stores_documents(docs, cat):
    # Load settings
    settings = cat.mad_hatter.get_plugin().load_settings()
    group_size = settings["group_size"]
    print(group_size)

    notification = f"Starting to process {len(docs)} documents"
    log(notification, "INFO")
    cat.send_ws_message(notification, msg_type="notification")

    all_documents = []

    # Compute total documents for progress notification
    n_groups = len(docs) // group_size
    print(len(docs))
    print(n_groups)
    print(group_size)

    if n_groups == 0:
        n_groups = 1

    # Process documents in groups
    for n, i in enumerate(range(0, len(docs), group_size)):
        # Notify the admin of the progress
        progress = (n * 100) // n_groups
        print(progress)
        message = f"{progress}% of processing"
        cat.send_ws_message(message, msg_type="notification")
        log(message, "INFO")

        # Get the group of docs
        group = docs[i: i + group_size]

        # Process each document in the group to add metadata like chapter info
        for doc in group:
            document_id = doc.metadata["source"]

            supabase_url: str = settings['supabase_url']
            supabase_key: str = settings['supabase_key']
            supabase: Client = create_client(supabase_url, supabase_key)

            print("Supabase URL:", supabase_url)
            print("Supabase Key:", supabase_key)

            print(f"Document metadata: {doc.metadata}")

            # Retrieve chapter information
            chapter = get_chapter(document_id, cat, supabase)
            doc.metadata["chapter"] = chapter
            print(chapter)

            # Add the processed document to the list of all documents
            all_documents.append(doc)

    # Extend the original document list with the processed ones
    docs.extend(all_documents)

    return docs

def get_chapter(document_id, cat, supabase):
    print("Query for document ID:", document_id)
    
    # Query Supabase to retrieve chapter information based on document_id
    response = supabase.table('capitoli').select("*").eq("document_id", document_id).execute()
    print(response)

    data = response.data
    print("Response data:", data)

    # Format chapters as a string: pagina | titolo
    chapters = "\n".join("|".join((str(chapter["pagina"]), chapter["titolo"])) for chapter in data)

    print("Formatted chapters from query response:")
    print(chapters)

    # Use an LLM to determine the chapter for the document
    prompt = f"""
        Ti verrà caricato un regolamento diviso in sezioni che istituisce un codice comunitario dei visti, 
        definendo procedure e condizioni per il rilascio di visti per soggiorni di breve durata 
        nell'area Schengen, fino a tre mesi su un periodo di sei mesi. 
        È essenziale per comprendere le normative sui visti di breve durata. 
        {chapters}
                                
        Ogni sezione del documento è formattato in questo modo: pagina | Titolo

        Identifica il capitolo a cui appartiene questo documento.
    """
    
    res = cat.llm(prompt)
    
    return res

@hook
def agent_prompt_prefix(prompt_prefix, cat):
    settings = cat.mad_hatter.get_plugin().load_settings()
    prompt_prefix = settings["data_prompt"]

    return prompt_prefix

@hook  # default priority = 1
def agent_prompt_suffix(prompt_suffix, cat):
    # tell the LLM to always answer in a specific language
    prompt_suffix = """ 
    # Context

    {episodic_memory}

    {declarative_memory}

    {tools_output}

    ALWAYS answer in Italian.
     

    ## Conversation until now:{chat_history}
     - Human: {input}
       - AI: 
    """
    return prompt_suffix

#@hook
#def before_cat_sends_message(message, cat):
    # use the LLM to rephrase the Cat's answer
#    log.info(message.why.memory['declarative'])
#    if len(cat.working_memory.declarative_memories) == 0:
#        message.content = "I don't know!"
#    return message

@hook
def before_cat_sends_message(message, cat):
    # Estrai i metadati desiderati
    metadata = message.why.memory['declarative'][0].get('metadata')
    source = metadata.get('source', 'N/A')
    page_number = metadata.get('page_number', 'N/A')
    #chapter = metadata.get('chapter', 'N/A')

    # Crea una rappresentazione formattata dei metadati
    metadata_info = (
        f"\n\n--- Fonti ---\n"
        f"Source: {source}\n"
        f"Page Number: {page_number}\n"
        #f"Chapter: {chapter}\n"
    )

    # Appendi i metadati al contenuto del messaggio
    message.content += metadata_info

    log.info(message.why.memory['declarative'])
    if len(cat.working_memory.declarative_memories) == 0:
        message.content = "I don't know!"

    return message




