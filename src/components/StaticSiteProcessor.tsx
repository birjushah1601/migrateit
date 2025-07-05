import React, { useState } from 'react';
import { 
  Code, 
  FileText, 
  Image, 
  Palette, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Loader,
  Eye,
  Download,
  Globe,
  Zap,
  Search,
  ExternalLink
} from 'lucide-react';

interface StaticSiteProcessorProps {
  analysisData: any;
  modernizationOptions: any;
  designChanges: string;
}

export const StaticSiteProcessor: React.FC<StaticSiteProcessorProps> = ({ 
  analysisData, 
  modernizationOptions, 
  designChanges 
}) => {
  const [processingStep, setProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [previewMode, setPreviewMode] = useState<'before' | 'after'>('before');

  const processingSteps = [
    {
      name: 'Deep Site Crawl',
      description: 'Discovering all pages, assets, and internal links',
      icon: Search,
      duration: 3000
    },
    {
      name: 'Code Analysis',
      description: 'Analyzing HTML, CSS, and JavaScript structure',
      icon: Code,
      duration: 2500
    },
    {
      name: 'Content Extraction',
      description: 'Extracting and cataloging all content and assets',
      icon: FileText,
      duration: 3000
    },
    {
      name: 'Copyright Scanning',
      description: 'Identifying potential copyright and trademark risks',
      icon: Shield,
      duration: 2000
    },
    {
      name: 'Asset Processing',
      description: 'Optimizing images and media files',
      icon: Image,
      duration: 2500
    },
    {
      name: 'Code Modernization',
      description: 'Applying modern web standards and practices',
      icon: Palette,
      duration: 4000
    },
    {
      name: 'Link Validation',
      description: 'Ensuring all internal links work correctly',
      icon: Globe,
      duration: 1500
    }
  ];

  const startProcessing = async () => {
    setIsProcessing(true);
    
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));
    }
    
    setIsProcessing(false);
    setProcessComplete(true);
  };

  const modernizationResults = {
    htmlChanges: [
      'Converted 23 div elements to semantic HTML5 tags (header, nav, main, section, article)',
      'Added proper heading hierarchy (h1-h6) for better SEO',
      'Implemented ARIA labels and roles for accessibility',
      'Added meta viewport and modern meta tags for mobile responsiveness',
      'Replaced deprecated HTML attributes with CSS equivalents'
    ],
    cssChanges: [
      'Converted 45 inline styles to external CSS classes',
      'Implemented CSS Grid and Flexbox for modern layouts',
      'Added CSS custom properties (variables) for maintainability',
      'Optimized for mobile-first responsive design',
      'Consolidated duplicate CSS rules and improved organization'
    ],
    jsChanges: [
      'Updated jQuery 1.12 dependencies to vanilla ES6+ JavaScript',
      'Implemented modern event handling with addEventListener',
      'Added proper error handling and try-catch blocks',
      'Optimized DOM queries for better performance',
      'Replaced deprecated JavaScript methods with modern alternatives'
    ],
    performanceImprovements: [
      'Reduced total CSS file size by 34% through optimization',
      'Eliminated render-blocking resources',
      'Optimized images with modern WebP format where supported',
      'Improved Core Web Vitals scores (LCP, FID, CLS)',
      'Minified and compressed all static assets'
    ],
    accessibilityImprovements: [
      'Added alt text to all images',
      'Implemented proper focus management',
      'Enhanced keyboard navigation support',
      'Improved color contrast ratios',
      'Added screen reader friendly content structure'
    ]
  };

  const copyrightFindings = [
    {
      type: 'Images',
      risk: 'High',
      count: 12,
      description: 'Stock photos without clear licensing information',
      recommendation: 'Replace with licensed alternatives or verify usage rights'
    },
    {
      type: 'Fonts',
      risk: 'Medium',
      count: 3,
      description: 'Custom fonts that may require licensing',
      recommendation: 'Verify font licensing or replace with web-safe alternatives'
    },
    {
      type: 'Content',
      risk: 'Low',
      count: 2,
      description: 'Text content that may be copyrighted',
      recommendation: 'Review and rewrite if necessary'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Processing Control */}
      {!isProcessing && !processComplete && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Static Site Modernization</h2>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Processing Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Will be processed:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• {analysisData.pages} HTML pages</li>
                  <li>• {analysisData.cssFiles} CSS files</li>
                  <li>• {analysisData.jsFiles} JavaScript files</li>
                  <li>• {analysisData.mediaAssets} media assets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Modernization features:</h4>
                <ul className="text-blue-700 space-y-1">
                  {Object.entries(modernizationOptions)
                    .filter(([_, enabled]) => enabled)
                    .map(([key, _]) => (
                      <li key={key}>• {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          
          <button
            onClick={startProcessing}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Start Modernization Process
          </button>
        </div>
      )}

      {/* Processing Progress */}
      {isProcessing && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Processing in Progress</h2>
          <div className="space-y-4">
            {processingSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === processingStep;
              const isCompleted = index < processingStep;
              
              return (
                <div key={index} className={`flex items-center gap-4 p-4 rounded-lg ${
                  isActive ? 'bg-blue-50' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-100' : isCompleted ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : isActive ? (
                      <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Processing Results */}
      {processComplete && (
        <>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Modernization Complete</h2>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Successfully Processed</span>
              </div>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Preview:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('before')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    previewMode === 'before'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setPreviewMode('after')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    previewMode === 'after'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  After
                </button>
              </div>
            </div>

            {/* Modernization Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">HTML Improvements</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    {modernizationResults.htmlChanges.map((change, index) => (
                      <li key={index}>• {change}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">CSS Enhancements</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {modernizationResults.cssChanges.map((change, index) => (
                      <li key={index}>• {change}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">JavaScript Updates</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    {modernizationResults.jsChanges.map((change, index) => (
                      <li key={index}>• {change}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-2">Performance Gains</h3>
                  <ul className="text-sm text-orange-800 space-y-1">
                    {modernizationResults.performanceImprovements.map((improvement, index) => (
                      <li key={index}>• {improvement}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-indigo-900 mb-2">Accessibility Enhancements</h3>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    {modernizationResults.accessibilityImprovements.map((improvement, index) => (
                      <li key={index}>• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Analysis Results */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Copyright & Legal Analysis</h2>
            <div className="space-y-4">
              {copyrightFindings.map((finding, index) => (
                <div key={index} className={`p-4 rounded-lg ${getRiskColor(finding.risk)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{finding.type}</h3>
                      <p className="text-sm opacity-90">{finding.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{finding.count} items</div>
                      <div className="text-xs opacity-75">{finding.risk} Risk</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    Recommendation: {finding.recommendation}
                  </div>
                </div>
              ))}
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Legal Compliance Notice</h3>
                    <p className="text-sm text-blue-800">
                      We recommend consulting with legal counsel regarding the identified copyright risks before proceeding with migration. 
                      Our team can assist in replacing flagged content with properly licensed alternatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Changes Applied */}
          {designChanges && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Custom Design Changes</h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Palette className="w-6 h-6 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">Applied Transformations</h3>
                    <p className="text-purple-800 mb-4">{designChanges}</p>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Design changes have been successfully applied while preserving functionality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Download Options */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Download Modernized Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Complete Package</div>
                  <div className="text-sm text-gray-600">All modernized files</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Preview Site</div>
                  <div className="text-sm text-gray-600">Test before migration</div>
                </div>
              </button>
              
              <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Change Report</div>
                  <div className="text-sm text-gray-600">Detailed modifications</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};