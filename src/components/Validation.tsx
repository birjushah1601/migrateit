import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  Mail, 
  Shield, 
  Database, 
  ArrowRight, 
  ArrowLeft,
  Play,
  Loader,
  ExternalLink,
  Code,
  Zap
} from 'lucide-react';

interface ValidationProps {
  siteType: 'dynamic' | 'static';
  onNext: () => void;
  onBack: () => void;
}

export const Validation: React.FC<ValidationProps> = ({ siteType, onNext, onBack }) => {
  const [validationStarted, setValidationStarted] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const getDynamicValidationTests = () => [
    {
      name: 'URL Accessibility',
      description: 'Checking all URLs and internal links',
      icon: Globe,
      duration: 3000,
      result: { status: 'passed', details: '2,847 URLs tested successfully' }
    },
    {
      name: 'Database Connectivity',
      description: 'Verifying database connections',
      icon: Database,
      duration: 2000,
      result: { status: 'passed', details: 'All database connections working' }
    },
    {
      name: 'Email Functionality',
      description: 'Testing email sending and receiving',
      icon: Mail,
      duration: 4000,
      result: { status: 'warning', details: 'SMTP configuration needs adjustment' }
    },
    {
      name: 'SSL Certificate',
      description: 'Validating SSL certificate installation',
      icon: Shield,
      duration: 2500,
      result: { status: 'passed', details: 'SSL certificate active and valid' }
    },
    {
      name: 'Form Submissions',
      description: 'Testing contact forms and submissions',
      icon: CheckCircle,
      duration: 3500,
      result: { status: 'passed', details: 'All forms working correctly' }
    },
    {
      name: 'Performance Testing',
      description: 'Checking page load times and performance',
      icon: Globe,
      duration: 5000,
      result: { status: 'passed', details: 'Average load time: 1.2s (improved)' }
    },
  ];

  const getStaticValidationTests = () => [
    {
      name: 'URL Accessibility',
      description: 'Checking all URLs and internal links',
      icon: Globe,
      duration: 2500,
      result: { status: 'passed', details: '47 pages tested successfully' }
    },
    {
      name: 'Code Modernization',
      description: 'Verifying modernized HTML, CSS, and JavaScript',
      icon: Code,
      duration: 3000,
      result: { status: 'passed', details: 'All code successfully modernized' }
    },
    {
      name: 'Responsive Design',
      description: 'Testing mobile and tablet compatibility',
      icon: Globe,
      duration: 3500,
      result: { status: 'passed', details: 'Responsive design working across all devices' }
    },
    {
      name: 'SSL Certificate',
      description: 'Validating SSL certificate installation',
      icon: Shield,
      duration: 2000,
      result: { status: 'passed', details: 'SSL certificate active and valid' }
    },
    {
      name: 'Performance Optimization',
      description: 'Checking load times and Core Web Vitals',
      icon: Zap,
      duration: 4000,
      result: { status: 'passed', details: 'Average load time: 0.8s (62% improvement)' }
    },
    {
      name: 'Accessibility Compliance',
      description: 'Testing WCAG 2.1 accessibility standards',
      icon: CheckCircle,
      duration: 3000,
      result: { status: 'passed', details: 'WCAG 2.1 AA compliance achieved' }
    },
  ];

  const validationTests = siteType === 'static' ? getStaticValidationTests() : getDynamicValidationTests();

  const startValidation = () => {
    setValidationStarted(true);
    setIsRunning(true);
    setCurrentTest(0);
    setTestResults([]);
    runNextTest();
  };

  const runNextTest = () => {
    if (currentTest < validationTests.length) {
      setTimeout(() => {
        setTestResults(prev => [...prev, validationTests[currentTest]]);
        setCurrentTest(prev => prev + 1);
        
        if (currentTest + 1 < validationTests.length) {
          runNextTest();
        } else {
          setIsRunning(false);
        }
      }, validationTests[currentTest].duration);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Loader className="w-5 h-5 text-gray-600 animate-spin" />;
    }
  };

  const completedTests = testResults.length;
  const totalTests = validationTests.length;
  const isComplete = completedTests === totalTests && !isRunning;

  const getPassedCount = () => testResults.filter(test => test.result.status === 'passed').length;
  const getWarningCount = () => testResults.filter(test => test.result.status === 'warning').length;
  const getFailedCount = () => testResults.filter(test => test.result.status === 'failed').length;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post-Migration Validation</h1>
          <p className="text-gray-600">
            Comprehensive testing to ensure your {siteType} website is working correctly
          </p>
        </div>

        {/* Test Control */}
        {!validationStarted && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ready to Validate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {validationTests.map((test, index) => {
                const Icon = test.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-600">{test.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={startValidation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Validation Tests
            </button>
          </div>
        )}

        {/* Validation Progress */}
        {validationStarted && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Validation Progress</h2>
              <div className="text-sm text-gray-500">
                {completedTests} of {totalTests} tests completed
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedTests / totalTests) * 100}%` }}
                />
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-4">
              {validationTests.map((test, index) => {
                const Icon = test.icon;
                const isCompleted = index < completedTests;
                const isRunning = index === currentTest && !isComplete;
                const result = isCompleted ? test.result : null;
                
                return (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg ${
                    isCompleted ? 'bg-gray-50' : isRunning ? 'bg-blue-50' : 'bg-white border border-gray-200'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-gray-100' : isRunning ? 'bg-blue-100' : 'bg-gray-50'
                    }`}>
                      {isCompleted ? (
                        getStatusIcon(result.status)
                      ) : isRunning ? (
                        <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${
                          isCompleted ? getStatusColor(result.status) : 
                          isRunning ? 'text-blue-900' : 'text-gray-500'
                        }`}>
                          {test.name}
                        </h3>
                        {isRunning && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Running...
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {isCompleted ? result.details : test.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Validation Summary */}
        {isComplete && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getPassedCount()}</div>
                <div className="text-sm text-green-800">Tests Passed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{getWarningCount()}</div>
                <div className="text-sm text-yellow-800">Warnings</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{getFailedCount()}</div>
                <div className="text-sm text-red-800">Failures</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                {siteType === 'dynamic' && <li>• Email SMTP configuration requires manual adjustment</li>}
                {siteType === 'static' && <li>• All modernization features are working correctly</li>}
                <li>• DNS propagation may take 24-48 hours to complete</li>
                <li>• Monitor website performance over the next 24 hours</li>
                <li>• Update any remaining hard-coded URLs if found</li>
                {siteType === 'static' && <li>• Consider setting up automated performance monitoring</li>}
              </ul>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {isComplete && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ExternalLink className="w-4 h-4" />
                View Live Site
              </button>
              {siteType === 'dynamic' ? (
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4" />
                  Test Email Settings
                </button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Zap className="w-4 h-4" />
                  Performance Report
                </button>
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
            Back to Migration
          </button>
          
          {isComplete && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Generate Reports
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};