import React, { useState } from 'react';
import { X } from 'lucide-react';
import { COURT_TYPES, COURTS_BY_TYPE, CASE_STATUSES } from './constants';
import type { Filters } from './types';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onApply: (filters: Filters) => void;
}

export const FiltersModal = ({ isOpen, onClose, filters, onApply }: FiltersModalProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  if (!isOpen) return null;

  const handleCourtTypeChange = (type: string) => {
    setLocalFilters(prev => ({
      ...prev,
      courtType: type,
      court: '' // Reset court when type changes
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Classe de Tribunal</h4>
            <div className="grid grid-cols-2 gap-3">
              {COURT_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => handleCourtTypeChange(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    localFilters.courtType === type.id
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {localFilters.courtType && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Tribunal</h4>
              <div className="grid grid-cols-3 gap-3">
                {COURTS_BY_TYPE[localFilters.courtType].map(court => (
                  <button
                    key={court.id}
                    onClick={() => setLocalFilters(prev => ({ ...prev, court: court.id }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      localFilters.court === court.id
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {court.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
            <div className="grid grid-cols-2 gap-3">
              {CASE_STATUSES.map(status => (
                <button
                  key={status.id}
                  onClick={() => setLocalFilters(prev => ({ ...prev, status: status.id }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    localFilters.status === status.id
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => setLocalFilters({ courtType: '', court: '', status: '' })}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Limpar Filtros
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};