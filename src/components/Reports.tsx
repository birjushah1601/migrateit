import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Shield, 
  Database, 
  Globe, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Zap,
  Code,
  Palette
} from 'lucide-react';

interface ReportsProps {
  siteType: 'dynamic' | 'static';
  onBack: () => void;
}

export const Reports: React.FC<ReportsProps> = ({ siteType, onBack }) => {

  const getDynamicMigrationMetrics = () => [
    { label: 'Total Files Migrated', value: '12,847', icon: FileText },
    { label: 'Database Size', value: '245 MB', icon: Database },
    { label: 'Migration Duration', value: '42 minutes', icon: Clock },
    { label: 'Downtime', value: '0 seconds', icon: TrendingUp },
  ];

  const getStaticMigrationMetrics = () => [
    { label: 'Total Files Migrated', value: '234', icon: FileText },
    { label: 'Pages Modernized', value: '47', icon: Code },
    { label: 'Migration Duration', value: '28 minutes', icon: Clock },
    { label: 'Downtime', value: '0 seconds', icon: TrendingUp },
  ];

  const migrationMetrics = siteType === 'static' ? getStaticMigrationMetrics() : getDynamicMigrationMetrics();

  const performanceComparison = [
    { 
      metric: 'Page Load Time', 
      before: siteType === 'static' ? '2.1s' : '3.2s', 
      after: siteType === 'static' ? '0.8s' : '1.2s', 
      improvement: siteType === 'static' ? '62%' : '62%' 
    },
    { 
      metric: 'Server Response', 
      before: siteType === 'static' ? '450ms' : '850ms', 
      after: siteType === 'static' ? '180ms' : '320ms', 
      improvement: siteType === 'static' ? '60%' : '62%' 
    },
    { 
      metric: siteType === 'static' ? 'Asset Loading' : 'Database Queries', 
      before: siteType === 'static' ? '1.2s' : '45ms', 
      after: siteType === 'static' ? '0.4s' : '28ms', 
      improvement: siteType === 'static' ? '67%' : '38%' 
    },
    { 
      metric: 'First Paint', 
      before: siteType === 'static' ? '1.8s' : '2.1s', 
      after: siteType === 'static' ? '0.6s' : '0.9s', 
      improvement: siteType === 'static' ? '67%' : '57%' 
    },
  ];

  const securityRecommendations = [
    { 
      title: 'SSL Certificate', 
      status: 'implemented', 
      description: 'SSL certificate installed and configured'
    },
    { 
      title: 'Security Headers', 
      status: 'recommended', 
      description: 'Implement additional security headers for enhanced protection'
    },
    { 
      title: 'File Permissions', 
      status: 'implemented', 
      description: 'Proper file permissions set for all directories'
    },
    ...(siteType === 'dynamic' ? [{ 
      title: 'Database Security', 
      status: 'implemented', 
      description: 'Database user privileges configured correctly'
    }] : []),
    ...(siteType === 'static' ? [{ 
      title: 'Content Security Policy', 
      status: 'implemented', 
      description: 'CSP headers configured for enhanced security'
    }] : []),
  ];

  const getDynamicTroubleshootingItems = () => [
    {
      issue: 'Email Configuration',
      solution: 'Update SMTP settings in wp-config.php',
      priority: 'medium'
    },
    {
      issue: 'DNS Propagation',
      solution: 'Allow 24-48 hours for global DNS propagation',
      priority: 'low'
    },
    {
      issue: 'Cache Configuration',
      solution: 'Clear all caches and verify cache plugins',
      priority: 'low'
    },
  ];

  const getStaticTroubleshootingItems = () => [
    {
      issue: 'DNS Propagation',
      solution: 'Allow 24-48 hours for global DNS propagation',
      priority: 'low'
    },
    {
      issue: 'Cache Headers',
      solution: 'Verify browser caching is working correctly',
      priority: 'low'
    },
    {
      issue: 'Mobile Responsiveness',
      solution: 'Test on various devices to ensure responsive design',
      priority: 'low'
    },
  ];

  const troubleshootingItems = siteType === 'static' ? getStaticTroubleshootingItems() : getDynamicTroubleshootingItems();

  const downloadReport = (reportType: string) => {
    // In a real implementation, this would generate and download the report
    console.log(`Downloading ${reportType} report...`);
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Migration Reports</h1>
          <p className="text-gray-600">
            Comprehensive analysis and documentation of the {siteType} website migration process
          </p>
        </div>

        {/* Migration Summary */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Migration Summary</h2>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Successfully Completed</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Static Site Modernization Report */}
        {siteType === 'static' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Modernization Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Code Improvements</h3>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Converted to semantic HTML5</li>
                    <li>• Modernized CSS with Flexbox/Grid</li>
                    <li>• Updated JavaScript to ES6+</li>
                    <li>• Improved accessibility (WCAG 2.1)</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900">Design Preservation</h3>
                  </div>
                  <p className="text-sm text-purple-800">
                    Original design and visual appearance maintained while applying modern code standards.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Modernization Benefits</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 62% faster page load times</li>
                  <li>• Improved mobile responsiveness</li>
                  <li>• Better SEO with semantic markup</li>
                  <li>• Enhanced accessibility compliance</li>
                  <li>• Modern browser compatibility</li>
                  <li>• Cleaner, maintainable code</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Performance Comparison */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Metric</th>
                  <th className="text-left py-3 px-4">Before Migration</th>
                  <th className="text-left py-3 px-4">After Migration</th>
                  <th className="text-left py-3 px-4">Improvement</th>
                </tr>
              </thead>
              <tbody>
                {performanceComparison.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.metric}</td>
                    <td className="py-3 px-4 text-gray-600">{item.before}</td>
                    <td className="py-3 px-4 text-gray-600">{item.after}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        ↑ {item.improvement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Recommendations</h2>
            <div className="space-y-4">
              {securityRecommendations.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="mt-0.5">
                    {item.status === 'implemented' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Troubleshooting Guide</h2>
            <div className="space-y-4">
              {troubleshootingItems.map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{item.issue}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Reports */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Download Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => downloadReport('complete')}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Complete Migration Report</div>
                <div className="text-sm text-gray-600">Full documentation (PDF)</div>
              </div>
              <Download className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
            
            <button 
              onClick={() => downloadReport('performance')}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Performance Report</div>
                <div className="text-sm text-gray-600">Metrics & comparisons</div>
              </div>
              <Download className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
            
            <button 
              onClick={() => downloadReport('security')}
              className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Shield className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Security Audit</div>
                <div className="text-sm text-gray-600">Security assessment</div>
              </div>
              <Download className="w-4 h-4 text-gray-400 ml-auto" />
            </button>
            
            {siteType === 'static' && (
              <button 
                onClick={() => downloadReport('modernization')}
                className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Code className="w-6 h-6 text-indigo-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Modernization Report</div>
                  <div className="text-sm text-gray-600">Code improvements</div>
                </div>
                <Download className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            )}
          </div>
        </div>

        {/* Migration Complete */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {siteType === 'static' ? 'Static Site Migration & Modernization' : 'Migration'} Successfully Completed!
          </h2>
          <p className="text-blue-100 mb-6">
            Your {siteType} website has been successfully migrated with zero downtime and improved performance.
            {siteType === 'static' && ' Code has been modernized to follow current web standards.'}
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Zero User Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Performance Improved</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Security Enhanced</span>
            </div>
            {siteType === 'static' && (
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Code Modernized</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Validation
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4" />
            Start New Migration
          </button>
        </div>
      </div>
    </div>
  );
};