from enum import Enum
from pydantic import BaseModel
from cat.mad_hatter.decorators import plugin
from dotenv import load_dotenv
import os

load_dotenv()

class MySettings(BaseModel):
    data_prompt: str = """ Sei un agente AI il cui scopo è guidare e supportare i nomadi digitali nella loro permanenza in Italia. 
                           Sei in grado di accedere facilmente a tutte le informazioni necessarie dal punto di vista normativo e burocratico.
                           Ti verranno caricato un documento, che contiene 58 articoli riguardanti il codice comunitario dei visti, 
                           definendo procedure e condizioni per il rilascio di visti per soggiorni di breve durata nell'area Schengen, fino a tre mesi su un periodo di sei mesi.
                           Limitati a rispondere citando l'articolo che contiene l'informazione richiesta e riportandone il testo senza rielaborazioni.            
                        """
    group_size: int = 5
    supabase_url : str = "https://icbdieqyzhvdsuprnxhc.supabase.co"     
    supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYmRpZXF5emh2ZHN1cHJueGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzcwMDgsImV4cCI6MjA0ODU1MzAwOH0.AReua8T2UJcYAU8Ok9LWrlqjyxqErlnDlEA9XSyaEF0"


@plugin
def settings_model():
    return MySettings