import React from 'react';
import { HelpCircle, FileText, Search, Bell } from 'lucide-react';

export const HelpTab = () => {
  return (
    <div className="max-w-3xl mx-auto prose prose-blue">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <HelpCircle className="w-6 h-6" />
        Como usar a plataforma
      </h1>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <FileText className="w-5 h-5" />
          Cadastro de Processos
        </h2>
        <p>
          Para cadastrar um novo processo, siga os passos:
        </p>
        <ol>
          <li>Acesse a aba "Cadastro"</li>
          <li>Selecione o tipo de tribunal</li>
          <li>Preencha as informações do processo e do cliente</li>
          <li>Anexe o arquivo PDF do processo</li>
          <li>Clique em "Cadastrar Processo"</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Search className="w-5 h-5" />
          Monitoramento
        </h2>
        <p>
          Na aba "Monitoramento" você pode:
        </p>
        <ul>
          <li>Visualizar todos os processos cadastrados</li>
          <li>Pesquisar processos específicos</li>
          <li>Filtrar por data ou status</li>
          <li>Editar ou remover processos através do menu de opções</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Bell className="w-5 h-5" />
          Notificações
        </h2>
        <p>
          O sistema irá notificar você sobre:
        </p>
        <ul>
          <li>Atualizações em processos</li>
          <li>Novos andamentos</li>
          <li>Prazos importantes</li>
          <li>Alertas de urgência</li>
        </ul>
      </section>
    </div>
  );
};