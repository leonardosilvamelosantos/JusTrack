import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { Case } from '../../types';
import { SubjectPreview } from './SubjectPreview';
import { mockCases } from './mockData';
import { FiltersModal } from './FiltersModal';
import { ActionMenu } from './ActionMenu';
import type { Filters } from './types';

export const MonitoringTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    courtType: '',
    court: '',
    status: ''
  });
  
  const cases: Case[] = mockCases;

  const handleEditCase = (caseId: string) => {
    console.log('Edit case:', caseId);
    // Implement edit functionality
  };

  const handleDeleteCase = (caseId: string) => {
    console.log('Delete case:', caseId);
    // Implement delete functionality
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button 
          onClick={() => setShowFilters(true)}
          className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {(filters.courtType || filters.court || filters.status) && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Ativos
            </span>
          )}
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Processo
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assunto
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Última Atualização
              </th>
              <th className="relative px-4 sm:px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((case_) => (
              <tr key={case_.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{case_.caseNumber}</div>
                  <div className="text-gray-500">{case_.court}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{case_.clientName}</div>
                  <div className="text-gray-500">{case_.clientWhatsapp}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                  <SubjectPreview 
                    text={case_.subject} 
                    onClick={() => setSelectedCase(case_)}
                  />
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${case_.status === 'urgent' ? 'bg-red-100 text-red-800' : 
                      case_.status === 'inProgress' ? 'bg-yellow-100 text-yellow-800' :
                      case_.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {case_.status === 'urgent' ? 'Urgente' :
                     case_.status === 'inProgress' ? 'Em Andamento' :
                     case_.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {case_.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionMenu 
                    onEdit={() => handleEditCase(case_.id)}
                    onDelete={() => handleDeleteCase(case_.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Assunto do Processo</h3>
            <p className="text-gray-700 mb-4">{selectedCase.subject}</p>
            <button
              onClick={() => setSelectedCase(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={handleFilterChange}
      />
    </div>
  );
};