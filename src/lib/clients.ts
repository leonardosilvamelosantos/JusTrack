import { supabase } from './supabase';

export const createOrGetClient = async (clientData: {
  name: string;
  whatsapp: string;
  cpf: string;
  lawyerId: string;  // Usamos lawyerId para corresponder ao objeto recebido
}) => {
  try {
    console.log('Dados recebidos:', clientData);
    console.log('Buscando advogado com ID:', clientData.lawyerId);


    // Verifica se o ID do advogado foi fornecido
    if (!clientData.lawyerId) {
      console.error('ID do advogado não fornecido');
      throw new Error('ID do advogado não fornecido');
    }

    // Verifica se o advogado existe usando a coluna "lawyer_id" no banco
    const { data: lawyer, error: lawyerError } = await supabase
      .from('lawyers')
      .select('*')
      .eq('lawyer_id', clientData.lawyerId)
      .single();

    if (lawyerError) {
      console.error('Erro ao verificar advogado:', lawyerError);
      throw new Error('Erro ao verificar advogado');
    }

    if (!lawyer || lawyer.length === 0) {
      console.error('Advogado não encontrado');
      throw new Error('Advogado não encontrado');
    }

    // Verifica se o cliente já existe com o CPF e o lawyer_id
    const { data: existingClient, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('cpf', clientData.cpf)
      .eq('lawyer_id', clientData.lawyerId)
      .single();

    if (clientError) {
      console.error('Erro ao verificar cliente:', clientError);
      throw new Error('Erro ao verificar cliente');
    }

    if (existingClient) {
      return existingClient;  // Retorna o cliente existente
    }

    // Cria um novo cliente caso não exista
    const { data: newClient, error: insertError } = await supabase
      .from('clients')
      .insert([{
        lawyer_id: clientData.lawyerId,  // Associando ao advogado correto
        name: clientData.name,
        whatsapp: clientData.whatsapp,
        cpf: clientData.cpf,
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao criar cliente:', insertError);
      throw new Error('Erro ao criar cliente');
    }

    return newClient;  // Retorna o novo cliente criado
  } catch (error) {
    console.error('Erro em createOrGetClient:', error);
    throw error;
  }
};
