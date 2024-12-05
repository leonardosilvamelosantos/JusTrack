import requests
import json
import psycopg2
from datetime import datetime

# Base da URL
base_url = "https://api-publica.datajud.cnj.jus.br/"

api_key_datajud = "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw=="


# URLs para os Tribunais Estaduais e Regionais Federais
urls_api_publica = {
    "tjac": base_url + "api_publica_tjac/_search",
    "tjal": base_url + "api_publica_tjal/_search",
    "tjam": base_url + "api_publica_tjam/_search",
    "tjap": base_url + "api_publica_tjap/_search",
    "tjba": base_url + "api_publica_tjba/_search",
    "tjce": base_url + "api_publica_tjce/_search",
    "tjdft": base_url + "api_publica_tjdft/_search",
    "tjes": base_url + "api_publica_tjes/_search",
    "tjgo": base_url + "api_publica_tjgo/_search",
    "tjma": base_url + "api_publica_tjma/_search",
    "tjmg": base_url + "api_publica_tjmg/_search",
    "tjms": base_url + "api_publica_tjms/_search",
    "tjmt": base_url + "api_publica_tjmt/_search",
    "tjpa": base_url + "api_publica_tjpa/_search",
    "tjpb": base_url + "api_publica_tjpb/_search",
    "tjpe": base_url + "api_publica_tjpe/_search",
    "tjpi": base_url + "api_publica_tjpi/_search",
    "tjpr": base_url + "api_publica_tjpr/_search",
    "tjrj": base_url + "api_publica_tjrj/_search",
    "tjrn": base_url + "api_publica_tjrn/_search",
    "tjro": base_url + "api_publica_tjro/_search",
    "tjrr": base_url + "api_publica_tjrr/_search",
    "tjrs": base_url + "api_publica_tjrs/_search",
    "tjsc": base_url + "api_publica_tjsc/_search",
    "tjse": base_url + "api_publica_tjse/_search",
    "tjsp": base_url + "api_publica_tjsp/_search",
    "tjto": base_url + "api_publica_tjto/_search",
    "trf1": base_url + "api_publica_trf1/_search",
    "trf2": base_url + "api_publica_trf2/_search",
    "trf3": base_url + "api_publica_trf3/_search",
    "trf4": base_url + "api_publica_trf4/_search",
    "trf5": base_url + "api_publica_trf5/_search",
    "trf6": base_url + "api_publica_trf6/_search",
}

# Configuração do banco de dados
db_config = {
    "dbname": "nome_do_banco",
    "user": "usuario",
    "password": "senha",
    "host": "localhost",
    "port": "5432"
}

def conectar_ao_banco():
    """
    Conecta ao banco de dados PostgreSQL.
    :return: Conexão ao banco
    """
    try:
        conn = psycopg2.connect(**db_config)
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

def buscar_processos_no_banco():
    """
    Busca tribunais e números de processos na tabela `processos`.
    :return: Lista de dicionários com tribunal e número de processo
    """
    conn = conectar_ao_banco()
    if not conn:
        return []

    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT tribunal, numero_processo FROM processos")
            rows = cursor.fetchall()
            return [{"tribunal": row[0], "numero_processo": row[1]} for row in rows]
    except Exception as e:
        print(f"Erro ao buscar dados do banco: {e}")
        return []
    finally:
        conn.close()

def buscar_processo(tribunal, numeros_processos):
    """
    Consulta processos no tribunal especificado.
    
    :param tribunal: Sigla do tribunal (ex.: "tjsp", "trf1")
    :param numeros_processos: Lista de números de processos a serem consultados
    :return: Dados dos processos encontrados
    """
    if tribunal not in urls_api_publica:
        print("Tribunal inválido! Certifique-se de usar o código correto.")
        return None

    url = urls_api_publica[tribunal]
    resultados = []

    for numero_processo in numeros_processos:
        payload = json.dumps({
            "size": 10,
            "query": {
                "term": {"numeroProcesso.keyword": numero_processo}
            },
            "sort": [{"dataAjuizamento": {"order": "desc"}}]
        })

        headers = {
            'Authorization': api_key_datajud,
            'Content-Type': 'application/json'
        }

        try:
            response = requests.post(url, headers=headers, data=payload)
            if response.status_code == 200:
                resultados.append(response.json())
            else:
                print(f"Erro ao consultar o processo {numero_processo}: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Erro ao fazer a requisição para o processo {numero_processo}: {e}")

    return resultados

def salvar_dados_em_json(dados, nome_arquivo="resultados.json"):
    """
    Salva os dados em um arquivo JSON.
    
    :param dados: Dados a serem salvos
    :param nome_arquivo: Nome do arquivo de saída
    """
    try:
        with open(nome_arquivo, 'w', encoding='utf-8') as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=4)
        print(f"Dados salvos em {nome_arquivo}.")
    except Exception as e:
        print(f"Erro ao salvar os dados em JSON: {e}")

def main():
    # Busca tribunais e processos no banco
    processos = buscar_processos_no_banco()
    if not processos:
        print("Nenhum processo encontrado no banco de dados.")
        return

    # Organiza os processos por tribunal
    tribunais_processos = {}
    for processo in processos:
        tribunal = processo["tribunal"]
        numero_processo = processo["numero_processo"]
        if tribunal not in tribunais_processos:
            tribunais_processos[tribunal] = []
        tribunais_processos[tribunal].append(numero_processo)

    # Consulta os dados e salva em JSON
    dados_coletados = []
    for tribunal, numeros_processos in tribunais_processos.items():
        print(f"Consultando processos do tribunal: {tribunal}")
        dados = buscar_processo(tribunal, numeros_processos)
        if dados:
            dados_coletados.extend(dados)

    if dados_coletados:
        salvar_dados_em_json(dados_coletados)

if __name__ == "__main__":
    main()