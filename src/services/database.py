from supabase import create_client
import os
from typing import List, Dict, Optional

class Database:
    def __init__(self):
        supabase_url = os.getenv("VITE_SUPABASE_URL")
        supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")
        
        if not supabase_url or not supabase_key:
            raise ValueError("Variáveis de ambiente do Supabase não encontradas")
            
        self.supabase = create_client(supabase_url, supabase_key)

    async def get_processos_by_lawyer(self, lawyer_id: str) -> List[Dict]:
        """Busca todos os processos de um advogado."""
        response = await self.supabase.table('cases')\
            .select('*')\
            .eq('lawyer_id', lawyer_id)\
            .execute()
        return response.data

    async def save_processo_update(self, processo_id: str, dados_atualizacao: Dict) -> None:
        """Salva uma atualização de processo no banco."""
        await self.supabase.table('cases')\
            .update(dados_atualizacao)\
            .eq('id', processo_id)\
            .execute()

    async def get_tribunal_processos(self) -> List[Dict]:
        """Retorna lista de processos agrupados por tribunal."""
        response = await self.supabase.table('cases')\
            .select('court, case_number')\
            .execute()
        return response.data

    async def save_processo_details(self, processo_id: str, detalhes: Dict) -> None:
        """Salva os detalhes de um processo consultado na API."""
        await self.supabase.table('cases')\
            .update({
                'subject': detalhes.get('subject', ''),
                'description': detalhes.get('description', ''),
                'updated_at': 'now()'
            })\
            .eq('id', processo_id)\
            .execute()