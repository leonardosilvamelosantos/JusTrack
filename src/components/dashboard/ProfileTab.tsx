import React from 'react';
import { ProfileSetupForm } from '../ProfileSetupForm';

export const ProfileTab = () => {
  const handleProfileUpdate = (data: any) => {
    console.log('Profile updated:', data);
  };

  return <ProfileSetupForm onComplete={handleProfileUpdate} />;
};