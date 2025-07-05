import React, { useState } from 'react';
import { AuthWrapper } from './components/AuthWrapper';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Analysis } from './components/Analysis';
import { Compatibility } from './components/Compatibility';
import { Migration } from './components/Migration';
import { Validation } from './components/Validation';
import { Reports } from './components/Reports';

export type ActiveStep = 'dashboard' | 'analysis' | 'compatibility' | 'migration' | 'validation' | 'reports';

function App() {
  const [activeStep, setActiveStep] = useState<ActiveStep>('dashboard');
  const [migrationData, setMigrationData] = useState<{
    siteType?: 'dynamic' | 'static';
    [key: string]: any;
  }>({});

  const renderActiveComponent = () => {
    switch (activeStep) {
      case 'dashboard':
        return <Dashboard onNext={() => setActiveStep('analysis')} />;
      case 'analysis':
        return <Analysis 
          onNext={(siteType) => {
            setMigrationData(prev => ({ ...prev, siteType }));
            setActiveStep('compatibility');
          }} 
          onBack={() => setActiveStep('dashboard')} 
        />;
      case 'compatibility':
        return <Compatibility 
          siteType={migrationData.siteType || 'dynamic'}
          onNext={() => setActiveStep('migration')} 
          onBack={() => setActiveStep('analysis')} 
        />;
      case 'migration':
        return <Migration 
          siteType={migrationData.siteType || 'dynamic'}
          onNext={() => setActiveStep('validation')} 
          onBack={() => setActiveStep('compatibility')} 
        />;
      case 'validation':
        return <Validation 
          siteType={migrationData.siteType || 'dynamic'}
          onNext={() => setActiveStep('reports')} 
          onBack={() => setActiveStep('migration')} 
        />;
      case 'reports':
        return <Reports 
          siteType={migrationData.siteType || 'dynamic'}
          onBack={() => setActiveStep('validation')} 
        />;
      default:
        return <Dashboard onNext={() => setActiveStep('analysis')} />;
    }
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} />
        <main className="flex-1 overflow-auto">
          {renderActiveComponent()}
        </main>
      </div>
    </AuthWrapper>
  );
}

export default App;