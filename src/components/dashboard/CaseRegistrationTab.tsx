import React, { useState } from 'react';
import { COURTS } from './constants';
import { CourtSelector } from './CourtSelector';
import { CaseForm } from './CaseForm';

export const CaseRegistrationTab = () => {
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (formData: any) => {
    try {
      console.log('Form submitted:', { selectedCourt, ...formData });
      setSuccessMessage('Processo cadastrado com sucesso!');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedCourt('');
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-0">
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {successMessage}
        </div>
      )}
      
      {!selectedCourt ? (
        <CourtSelector onSelect={setSelectedCourt} />
      ) : (
        <CaseForm 
          selectedCourt={selectedCourt} 
          onSubmit={handleSubmit} 
          onBack={() => setSelectedCourt('')} 
        />
      )}
    </div>
  );
};