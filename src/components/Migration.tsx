import React, { useState, useEffect } from 'react';
import { 
  Database, 
  FileText, 
  Mail, 
  Globe, 
  Shield, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Loader,
  AlertCircle,
  Play,
  Pause,
  Code,
  Zap
} from 'lucide-react';

interface MigrationProps {
  siteType: 'dynamic' | 'static';
  onNext: () => void;
  onBack: () => void;
}

export const Migration: React.FC<MigrationProps> = ({ siteType, onNext, onBack }) => {
  const [migrationStarted, setMigrationStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const getDynamicMigrationSteps = () => [
    { 
      id: 'backup', 
      title: 'Create Backup', 
      description: 'Creating complete backup of source website',
      icon: Database,
      duration: 300000 // 5 minutes
    },
    { 
      id: 'database', 
      title: 'Transfer Database', 
      description: 'Migrating database with proper encoding',
      icon: Database,
      duration: 600000 // 10 minutes
    },
    { 
      id: 'files', 
      title: 'Transfer Files', 
      description: 'Moving all files maintaining hierarchy',
      icon: FileText,
      duration: 900000 // 15 minutes
    },
    { 
      id: 'email', 
      title: 'Email Migration', 
      description: 'Transferring email accounts and settings',
      icon: Mail,
      duration: 300000 // 5 minutes
    },
    { 
      id: 'dns', 
      title: 'DNS Configuration', 
      description: 'Updating DNS records and nameservers',
      icon: Globe,
      duration: 180000 // 3 minutes
    },
    { 
      id: 'ssl', 
      title: 'SSL Certificate', 
      description: 'Installing and configuring SSL certificate',
      icon: Shield,
      duration: 240000 // 4 minutes
    },
  ];

  const getStaticMigrationSteps = () => [
    { 
      id: 'backup', 
      title: 'Create Backup', 
      description: 'Creating complete backup of source website',
      icon: Database,
      duration: 180000 // 3 minutes
    },
    { 
      id: 'modernization', 
      title: 'Code Modernization', 
      description: 'Applying modern web standards and optimizations',
      icon: Code,
      duration: 480000 // 8 minutes
    },
    { 
      id: 'files', 
      title: 'Transfer Files', 
      description: 'Moving modernized files to hosting environment',
      icon: FileText,
      duration: 360000 // 6 minutes
    },
    { 
      id: 'optimization', 
      title: 'Performance Optimization', 
      description: 'Configuring caching and compression',
      icon: Zap,
      duration: 240000 // 4 minutes
    },
    { 
      id: 'dns', 
      title: 'DNS Configuration', 
      description: 'Updating DNS records and nameservers',
      icon: Globe,
      duration: 180000 // 3 minutes
    },
    { 
      id: 'ssl', 
      title: 'SSL Certificate', 
      description: 'Installing and configuring SSL certificate',
      icon: Shield,
      duration: 240000 // 4 minutes
    },
  ];

  const migrationSteps = siteType === 'static' ? getStaticMigrationSteps() : getDynamicMigrationSteps();

  const startMigration = () => {
    setMigrationStarted(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const pauseMigration = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (migrationStarted && !isPaused && currentStep < migrationSteps.length) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setCurrentStep(currentStep + 1);
            return 0;
          }
          return newProgress;
        });
      }, migrationSteps[currentStep].duration / 100);

      return () => clearInterval(timer);
    }
  }, [migrationStarted, isPaused, currentStep, migrationSteps]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'in-progress';
    return 'pending';
  };

  const isCompleted = currentStep >= migrationSteps.length;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Automated Migration</h1>
          <p className="text-gray-600">
            Executing seamless {siteType} website transfer with zero downtime
          </p>
        </div>

        {/* Migration Control */}
        {!migrationStarted && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Ready to Begin {siteType === 'static' ? 'Static Site' : 'Dynamic Site'} Migration
            </h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Important Notes</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Migration will maintain 99.9% uptime during transfer</li>
                    <li>• Backup will be created before any changes</li>
                    <li>• You can pause the migration at any time</li>
                    {siteType === 'static' && <li>• Code modernization will be applied during transfer</li>}
                    <li>• DNS changes may take 24-48 hours to propagate</li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              onClick={startMigration}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Migration Process
            </button>
          </div>
        )}

        {/* Migration Progress */}
        {migrationStarted && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Migration Progress</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Step {Math.min(currentStep + 1, migrationSteps.length)} of {migrationSteps.length}
                </span>
                <button
                  onClick={pauseMigration}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isPaused
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  }`}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {migrationSteps.map((step, index) => {
                const Icon = step.icon;
                const status = getStepStatus(index);
                
                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      status === 'completed' ? 'bg-green-100' :
                      status === 'in-progress' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : status === 'in-progress' ? (
                        <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        status === 'completed' ? 'text-green-900' :
                        status === 'in-progress' ? 'text-blue-900' :
                        'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      
                      {status === 'in-progress' && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {isPaused && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Pause className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Migration Paused</span>
                </div>
                <p className="text-sm text-yellow-800 mt-1">Click the play button to resume the migration process</p>
              </div>
            )}
          </div>
        )}

        {/* Migration Complete */}
        {isCompleted && (
          <div className="bg-green-50 rounded-xl p-8 border border-green-200 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Migration Complete!</h2>
              <p className="text-green-800 mb-4">
                Your {siteType} website has been successfully migrated to the new hosting environment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900">Files Transferred</div>
                  <div className="text-2xl font-bold text-green-600">
                    {siteType === 'static' ? '234' : '12,847'}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    {siteType === 'static' ? 'Total Size' : 'Database Size'}
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {siteType === 'static' ? '156 MB' : '245 MB'}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-gray-900">Migration Time</div>
                  <div className="text-2xl font-bold text-green-600">
                    {siteType === 'static' ? '28 min' : '42 min'}
                  </div>
                </div>
              </div>
              {siteType === 'static' && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Modernization Applied</h3>
                  <p className="text-sm text-gray-600">
                    Your static website has been modernized with semantic HTML5, responsive CSS, 
                    and optimized JavaScript while preserving the original design.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Compatibility
          </button>
          
          {isCompleted && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Continue to Validation
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};