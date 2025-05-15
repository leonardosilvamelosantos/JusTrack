import { supabase } from './supabase';

export const createCase = async (caseData: {
  lawyerId: string;
  clientId: string;
  caseNumber: string;
  court: string;
  subject: string;
  description?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('cases')
      .insert([{
        lawyer_id: caseData.lawyerId,
        client_id: caseData.clientId,
        case_number: caseData.caseNumber,
        court: caseData.court,
        subject: caseData.subject,
        description: caseData.description,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating case:', error);
      throw new Error('Erro ao criar processo');
    }

    return data;
  } catch (error) {
    console.error('Error in createCase:', error);
    throw error;
  }
};