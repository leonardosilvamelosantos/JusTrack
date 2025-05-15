import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { LoginForm } from './components/LoginForm';
import { FirstLoginForm } from './components/FirstLoginForm';
import { ProfileSetupForm } from './components/ProfileSetupForm';
import { Dashboard } from './components/Dashboard';

type Step = 'login' | 'firstLogin' | 'profileSetup' | 'dashboard';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('login');

  const handleFirstLogin = () => {
    setCurrentStep('firstLogin');
  };

  const handleFirstLoginComplete = (email: string, password: string) => {
    console.log('First login completed:', { email, password });
    setCurrentStep('profileSetup');
  };

  const handleProfileComplete = (data: any) => {
    console.log('Profile setup completed:', data);
    setCurrentStep('dashboard');
  };

  const handleLogin = () => {
    setCurrentStep('dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'firstLogin':
        return <FirstLoginForm onComplete={handleFirstLoginComplete} />;
      case 'profileSetup':
        return <ProfileSetupForm onComplete={handleProfileComplete} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <LoginForm onFirstLogin={handleFirstLogin} onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        <div className="flex justify-center">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}

export default App;