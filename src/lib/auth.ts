import { supabase } from './supabase';

export const authenticateUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return !error && data.user;
};

export const isEmailRegistered = (email: string) => {
  // Remove email validation to allow any email
  return true;
};

export const createLawyer = async (lawyerData: {
  oabNumber: string;
  name: string;
  email: string;
  address: string;
  whatsapp: string;
  oabState: string;
  howFound: string;
}) => {
  try {
    // First check if OAB number already exists
    const { data: existingLawyer } = await supabase
      .from('lawyers')
      .select('id')
      .eq('oab_number', lawyerData.oabNumber)
      .single();

    if (existingLawyer) {
      throw new Error('Número OAB já cadastrado');
    }

    // Create the lawyer profile
    const { data, error } = await supabase
      .from('lawyers')
      .insert([
        {
          oab_number: lawyerData.oabNumber,
          name: lawyerData.name,
          email: lawyerData.email,
          address: lawyerData.address,
          whatsapp: lawyerData.whatsapp,
          oab_state: lawyerData.oabState,
          how_found: lawyerData.howFound
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating lawyer:', error);
      throw new Error('Erro ao criar perfil de advogado');
    }

    return data;
  } catch (error) {
    console.error('Error in createLawyer:', error);
    throw error;
  }
};