import { Case } from '../../types';

export const mockCases: Case[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientWhatsapp: '11999999999',
    caseNumber: '0001234-12.2024.8.26.0100',
    court: 'TJSP',
    subject: 'Aumento salarial beneficiário cuja empresa rejeitou e demitiu com justa causa, alegando baixa produtividade e faltas injustificadas. O funcionário contesta apresentando atestados médicos e avaliações positivas de desempenho dos últimos 3 anos.',
    description: 'Processo Civil',
    status: 'urgent',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    clientName: 'Maria Santos',
    clientWhatsapp: '11988888888',
    caseNumber: '5005678-45.2024.4.03.6100',
    court: 'TRF3',
    subject: 'Revisão de benefício previdenciário por incapacidade permanente, onde o INSS negou a continuidade do benefício apesar dos laudos médicos indicarem agravamento da condição e impossibilidade de reabilitação profissional.',
    description: 'Processo Previdenciário',
    status: 'inProgress',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-14')
  },
  {
    id: '3',
    clientName: 'Pedro Oliveira',
    clientWhatsapp: '11977777777',
    caseNumber: '0003456-78.2024.5.02.0001',
    court: 'TRT2',
    subject: 'Reclamação trabalhista referente a horas extras não pagas, adicional noturno e danos morais por assédio moral sofrido no ambiente de trabalho, com apresentação de provas testemunhais e registros de ponto adulterados.',
    description: 'Processo Trabalhista',
    status: 'completed',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-10')
  }
];