import PyPDF2
from langchain.document_loaders.base import BaseBlobParser
from langchain.docstore.document import Document
from langchain.document_loaders.blob_loaders.schema import Blob
from typing import Iterator
from abc import ABC

class ConvertParser(BaseBlobParser, ABC):
    
    def lazy_parse(self, blob: Blob) -> Iterator[Document]:
        
        original_filename = blob.source
        if original_filename.endswith(".bin"):
            original_filename = original_filename[:-4]
        
        # Imposta document_id uguale a source (original_filename)
        document_id = original_filename
        
        # Legge i dati dal blob e estrae il testo dal PDF senza salvarlo localmente
        with blob.as_bytes_io() as file:
            # Usa PyPDF2 per leggere direttamente dall'oggetto BytesIO
            try:
                pdf_reader = PyPDF2.PdfReader(file)
                page_count = len(pdf_reader.pages)
                
                # Itera su ciascuna pagina e genera un Document per ciascuna pagina
                for page_num in range(page_count):
                    page = pdf_reader.pages[page_num]
                    page_content = page.extract_text()  # Estrae il testo dalla pagina corrente
                    
                    if page_content:  # Genera documenti solo se c'è contenuto
                        yield Document(
                            page_content=page_content,
                            metadata={
                                "source": original_filename,
                                "document_id": document_id,  # document_id uguale a source
                                "page_number": page_num + 1
                            }
                        )
            except Exception as e:
                print(f"Error processing PDF file {original_filename}: {e}")


