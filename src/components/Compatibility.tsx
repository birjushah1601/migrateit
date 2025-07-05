import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Shield, 
  Globe, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  X,
  Loader,
  Code
} from 'lucide-react';

interface CompatibilityProps {
  siteType: 'dynamic' | 'static';
  onNext: () => void;
  onBack: () => void;
}

export const Compatibility: React.FC<CompatibilityProps> = ({ siteType, onNext, onBack }) => {
  const [targetEnvironment, setTargetEnvironment] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  const environments = [
    { id: 'cpanel', name: 'cPanel Hosting', description: 'Shared hosting with cPanel interface' },
    { id: 'plesk', name: 'Plesk Hosting', description: 'Managed hosting with Plesk panel' },
    { id: 'vps', name: 'VPS Server', description: 'Virtual private server environment' },
    { id: 'dedicated', name: 'Dedicated Server', description: 'Full dedicated server hosting' },
    { id: 'cdn', name: 'CDN/Static Hosting', description: 'Content delivery network for static sites' },
  ];

  const handleCompatibilityCheck = async () => {
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsChecking(false);
    setCheckComplete(true);
  };

  const getDynamicCompatibilityResults = () => [
    { 
      category: 'Server Requirements', 
      icon: Server, 
      items: [
        { name: 'PHP Version', requirement: 'PHP 8.1+', status: 'compatible', note: 'Current: PHP 8.1' },
        { name: 'Memory Limit', requirement: '512MB+', status: 'compatible', note: 'Available: 1GB' },
        { name: 'Storage Space', requirement: '3GB+', status: 'compatible', note: 'Available: 50GB' },
      ]
    },
    { 
      category: 'Database Compatibility', 
      icon: Database, 
      items: [
        { name: 'MySQL Version', requirement: 'MySQL 5.7+', status: 'compatible', note: 'Target: MySQL 8.0' },
        { name: 'Database Size', requirement: '500MB', status: 'compatible', note: 'Current: 245MB' },
        { name: 'Character Set', requirement: 'utf8mb4', status: 'warning', note: 'Will be converted' },
      ]
    },
    { 
      category: 'SSL & Security', 
      icon: Shield, 
      items: [
        { name: 'SSL Certificate', requirement: 'Required', status: 'compatible', note: 'Let\'s Encrypt available' },
        { name: 'Security Headers', requirement: 'Recommended', status: 'compatible', note: 'Will be configured' },
      ]
    },
    { 
      category: 'DNS Configuration', 
      icon: Globe, 
      items: [
        { name: 'Domain Transfer', requirement: 'Nameservers', status: 'compatible', note: 'Manual update required' },
        { name: 'Email Records', requirement: 'MX Records', status: 'warning', note: 'Will need reconfiguration' },
      ]
    },
  ];

  const getStaticCompatibilityResults = () => [
    { 
      category: 'Static Hosting Requirements', 
      icon: Server, 
      items: [
        { name: 'Web Server', requirement: 'Apache/Nginx', status: 'compatible', note: 'Static file serving supported' },
        { name: 'Storage Space', requirement: '200MB+', status: 'compatible', note: 'Available: 50GB' },
        { name: 'Bandwidth', requirement: 'Unlimited', status: 'compatible', note: 'No restrictions' },
      ]
    },
    { 
      category: 'Modern Web Standards', 
      icon: Code, 
      items: [
        { name: 'HTTP/2 Support', requirement: 'Recommended', status: 'compatible', note: 'Supported by hosting' },
        { name: 'Gzip Compression', requirement: 'Required', status: 'compatible', note: 'Will be enabled' },
        { name: 'Cache Headers', requirement: 'Recommended', status: 'compatible', note: 'Will be configured' },
      ]
    },
    { 
      category: 'SSL & Security', 
      icon: Shield, 
      items: [
        { name: 'SSL Certificate', requirement: 'Required', status: 'compatible', note: 'Let\'s Encrypt available' },
        { name: 'Security Headers', requirement: 'Recommended', status: 'compatible', note: 'Will be configured' },
        { name: 'HTTPS Redirect', requirement: 'Required', status: 'compatible', note: 'Will be implemented' },
      ]
    },
    { 
      category: 'DNS Configuration', 
      icon: Globe, 
      items: [
        { name: 'Domain Transfer', requirement: 'Nameservers', status: 'compatible', note: 'Manual update required' },
        { name: 'CDN Integration', requirement: 'Optional', status: 'compatible', note: 'Available if needed' },
      ]
    },
  ];

  const compatibilityResults = siteType === 'static' ? getStaticCompatibilityResults() : getDynamicCompatibilityResults();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compatible':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'incompatible':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compatibility Assessment</h1>
          <p className="text-gray-600">
            Verify hosting environment requirements for seamless {siteType} website migration
          </p>
        </div>

        {/* Target Environment Selection */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Target Hosting Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => setTargetEnvironment(env.id)}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  targetEnvironment === env.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{env.name}</h3>
                <p className="text-sm text-gray-600">{env.description}</p>
              </button>
            ))}
          </div>
          
          {targetEnvironment && (
            <div className="mt-6">
              <button
                onClick={handleCompatibilityCheck}
                disabled={isChecking}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {isChecking ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Checking Compatibility...
                  </>
                ) : (
                  'Run Compatibility Check'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Compatibility Results */}
        {(isChecking || checkComplete) && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compatibility Results</h2>
            
            {isChecking && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-blue-600 mb-4">
                  <Loader className="w-8 h-8 animate-spin" />
                  <span className="text-lg font-medium">Checking compatibility...</span>
                </div>
                <p className="text-gray-500">Validating server requirements and configurations</p>
              </div>
            )}

            {checkComplete && (
              <div className="space-y-8">
                {compatibilityResults.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <div key={categoryIndex}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      </div>
                      
                      <div className="space-y-3 ml-11">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(item.status)}
                              <div>
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">{item.requirement}</p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">{item.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {checkComplete && (
          <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Compatibility Verified</h3>
                <p className="text-green-800">Your website is compatible with the selected hosting environment. Ready to proceed with migration.</p>
              </div>
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
            Back to Analysis
          </button>
          
          {checkComplete && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Start Migration
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};