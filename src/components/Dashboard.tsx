import React, { useState } from 'react';
import { MonitoringTab } from './dashboard/MonitoringTab';
import { CaseRegistrationTab } from './dashboard/CaseRegistrationTab';
import { HelpTab } from './dashboard/HelpTab';
import { ProfileTab } from './dashboard/ProfileTab';
import { LayoutDashboard, UserCircle, HelpCircle, FileText } from 'lucide-react';

type TabType = 'monitoring' | 'registration' | 'help' | 'profile';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('monitoring');

  const tabs = [
    { id: 'monitoring', label: 'Monitoramento', icon: LayoutDashboard },
    { id: 'registration', label: 'Cadastro', icon: FileText },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
    { id: 'profile', label: 'Perfil', icon: UserCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return <MonitoringTab />;
      case 'registration':
        return <CaseRegistrationTab />;
      case 'help':
        return <HelpTab />;
      case 'profile':
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`px-4 py-4 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                  ${activeTab === id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};