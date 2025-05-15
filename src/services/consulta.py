import requests
import json
from typing import List, Dict, Optional
from datetime import datetime
from .database import Database

class ConsultaProcessos:
    def __init__(self):
        self.base_url = "https://api-publica.datajud.cnj.jus.br/"
        self.api_key = "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=="
        self.db = Database()
        
        # URLs para os Tribunais
        self.urls_api_publica = {
            "tjac": self.base_url + "api_publica_tjac/_search",
            "tjal": self.base_url + "api_publica_tjal/_search",
            "tjam": self.base_url + "api_publica_tjam/_search",
            "tjap": self.base_url + "api_publica_tjap/_search",
            "tjba": self.base_url + "api_publica_tjba/_search",
            "tjce": self.base_url + "api_publica_tjce/_search",
            "tjdft": self.base_url + "api_publica_tjdft/_search",
            "tjes": self.base_url + "api_publica_tjes/_search",
            "tjgo": self.base_url + "api_publica_tjgo/_search",
            "tjma": self.base_url + "api_publica_tjma/_search",
            "tjmg": self.base_url + "api_publica_tjmg/_search",
            "tjms": self.base_url + "api_publica_tjms/_search",
            "tjmt": self.base_url + "api_publica_tjmt/_search",
            "tjpa": self.base_url + "api_publica_tjpa/_search",
            "tjpb": self.base_url + "api_publica_tjpb/_search",
            "tjpe": self.base_url + "api_publica_tjpe/_search",
            "tjpi": self.base_url + "api_publica_tjpi/_search",
            "tjpr": self.base_url + "api_publica_tjpr/_search",
            "tjrj": self.base_url + "api_publica_tjrj/_search",
            "tjrn": self.base_url + "api_publica_tjrn/_search",
            "tjro": self.base_url + "api_publica_tjro/_search",
            "tjrr": self.base_url + "api_publica_tjrr/_search",
            "tjrs": self.base_url + "api_publica_tjrs/_search",
            "tjsc": self.base_url + "api_publica_tjsc/_search",
            "tjse": self.base_url + "api_publica_tjse/_search",
            "tjsp": self.base_url + "api_publica_tjsp/_search",
            "tjto": self.base_url + "api_publica_tjto/_search",
            "trf1": self.base_url + "api_publica_trf1/_search",
            "trf2": self.base_url + "api_publica_trf2/_search",
            "trf3": self.base_url + "api_publica_trf3/_search",
            "trf4": self.base_url + "api_publica_trf4/_search",
            "trf5": self.base_url + "api_publica_trf5/_search",
            "trf6": self.base_url + "api_publica_trf6/_search",
        }

    async def buscar_processo(self, tribunal: str, numero_processo: str) -> Optional[Dict]:
        """
        Consulta um processo específico no tribunal.
        
        Args:
            tribunal: Sigla do tribunal (ex.: "tjsp", "trf1")
            numero_processo: Número do processo a ser consultado
            
        Returns:
            Dados do processo ou None se não encontrado
        """
        if tribunal.lower() not in self.urls_api_publica:
            print(f"Tribunal inválido: {tribunal}")
            return None

        url = self.urls_api_publica[tribunal.lower()]
        payload = json.dumps({
            "size": 1,
            "query": {
                "term": {"numeroProcesso.keyword": numero_processo}
            },
            "sort": [{"dataAjuizamento": {"order": "desc"}}]
        })

        headers = {
            'Authorization': self.api_key,
            'Content-Type': 'application/json'
        }

        try:
            response = requests.post(url, headers=headers, data=payload)
            if response.status_code == 200:
                return response.json()
            print(f"Erro na consulta: {response.status_code} - {response.text}")
            return None
        except Exception as e:
            print(f"Erro na requisição: {e}")
            return None

    async def atualizar_processos(self) -> None:
        """Atualiza todos os processos no banco com dados da API."""
        try:
            # Busca processos do banco
            processos = await self.db.get_tribunal_processos()
            
            for processo in processos:
                tribunal = processo['court'].lower()
                numero = processo['case_number']
                
                # Consulta API
                dados_api = await self.buscar_processo(tribunal, numero)
                if dados_api:
                    # Processa e salva os dados
                    detalhes = self._processar_dados_api(dados_api)
                    await self.db.save_processo_details(processo['id'], detalhes)
                    
        except Exception as e:
            print(f"Erro ao atualizar processos: {e}")

    def _processar_dados_api(self, dados_api: Dict) -> Dict:
        """Processa os dados retornados pela API."""
        try:
            hits = dados_api.get('hits', {}).get('hits', [])
            if not hits:
                return {}
                
            processo = hits[0]['_source']
            return {
                'subject': processo.get('assunto', ''),
                'description': processo.get('descricao', ''),
                'status': self._determinar_status(processo)
            }
        except Exception as e:
            print(f"Erro ao processar dados da API: {e}")
            return {}

    def _determinar_status(self, processo: Dict) -> str:
        """Determina o status do processo baseado nos dados da API."""
        # Implementar lógica de determinação de status
        return 'inProgress'  # Default status