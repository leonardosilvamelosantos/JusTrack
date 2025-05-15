export const COURTS = [
  { id: 'estadual', name: 'Tribunal Estadual', type: 'estadual' },
  { id: 'regional', name: 'Tribunal Regional', type: 'regional' },
  { id: 'federal', name: 'Tribunal Federal', type: 'federal' },
  { id: 'superior', name: 'Tribunais Superiores', type: 'superior' },
  { id: 'militar', name: 'Justiça Militar', type: 'militar' },
  { id: 'eleitoral', name: 'Justiça Eleitoral', type: 'eleitoral' },
  { id: 'trabalho', name: 'Justiça do Trabalho', type: 'trabalho' },
];

export const COURT_TYPES = [
  { id: 'estadual', name: 'Tribunal Estadual' },
  { id: 'regional', name: 'Tribunal Regional' },
  { id: 'federal', name: 'Tribunal Federal' },
  { id: 'superior', name: 'Tribunais Superiores' },
  { id: 'militar', name: 'Justiça Militar' },
  { id: 'eleitoral', name: 'Justiça Eleitoral' },
  { id: 'trabalho', name: 'Justiça do Trabalho' },
];

export const COURTS_BY_TYPE: Record<string, Array<{ id: string; name: string }>> = {
  estadual: [
    { id: 'TJSP', name: 'TJSP' },
    { id: 'TJRJ', name: 'TJRJ' },
    { id: 'TJMG', name: 'TJMG' },
    { id: 'TJRS', name: 'TJRS' },
    { id: 'TJPR', name: 'TJPR' },
  ],
  regional: [
    { id: 'TRF1', name: 'TRF1' },
    { id: 'TRF2', name: 'TRF2' },
    { id: 'TRF3', name: 'TRF3' },
    { id: 'TRF4', name: 'TRF4' },
    { id: 'TRF5', name: 'TRF5' },
  ],
  federal: [
    { id: 'JF-SP', name: 'JF-SP' },
    { id: 'JF-RJ', name: 'JF-RJ' },
    { id: 'JF-MG', name: 'JF-MG' },
  ],
  superior: [
    { id: 'STF', name: 'STF' },
    { id: 'STJ', name: 'STJ' },
    { id: 'TST', name: 'TST' },
  ],
  militar: [
    { id: 'STM', name: 'STM' },
    { id: 'TJM-SP', name: 'TJM-SP' },
    { id: 'TJM-MG', name: 'TJM-MG' },
  ],
  eleitoral: [
    { id: 'TSE', name: 'TSE' },
    { id: 'TRE-SP', name: 'TRE-SP' },
    { id: 'TRE-RJ', name: 'TRE-RJ' },
  ],
  trabalho: [
    { id: 'TRT1', name: 'TRT1' },
    { id: 'TRT2', name: 'TRT2' },
    { id: 'TRT3', name: 'TRT3' },
  ],
};

export const CASE_STATUSES = [
  { id: 'urgent', name: 'Urgente' },
  { id: 'inProgress', name: 'Em Andamento' },
  { id: 'completed', name: 'Concluído' },
];