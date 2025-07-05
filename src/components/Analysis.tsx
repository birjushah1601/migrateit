import React, { useState } from 'react';
import { 
  Globe, 
  Database, 
  FileText, 
  Image, 
  Server, 
  ArrowRight, 
  ArrowLeft,
  Search,
  CheckCircle,
  AlertCircle,
  Loader,
  Code,
  Palette,
  Shield,
  Zap
} from 'lucide-react';

interface AnalysisProps {
  onNext: (siteType: 'dynamic' | 'static') => void;
  onBack: () => void;
}

export const Analysis: React.FC<AnalysisProps> = ({ onNext, onBack }) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [siteType, setSiteType] = useState<'dynamic' | 'static'>('dynamic');
  const [modernizeEnabled, setModernizeEnabled] = useState(false);
  const [designChanges, setDesignChanges] = useState('');
  const [modernizationOptions, setModernizationOptions] = useState({
    html5Semantic: true,
    responsiveCSS: true,
    modernJS: true,
    accessibility: true,
    performance: true
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, siteType === 'static' ? 4000 : 3000));
    
    // Mock analysis data based on site type
    if (siteType === 'static') {
      setAnalysisData({
        siteType: 'Static HTML/CSS/JS',
        pages: 47,
        files: 234,
        mediaAssets: 89,
        cssFiles: 12,
        jsFiles: 8,
        size: '156 MB',
        technologies: ['HTML4/5', 'CSS2/3', 'jQuery 1.12', 'Bootstrap 3.4'],
        modernizationNeeded: modernizeEnabled,
        copyrightRisks: [
          'Stock photos without license verification',
          'Potential trademark usage in logo design',
          'Font usage may require licensing review'
        ],
        codeIssues: [
          'Non-semantic HTML elements (div-heavy structure)',
          'Inline CSS styles reducing maintainability',
          'Legacy JavaScript practices (jQuery dependencies)',
          'Missing accessibility attributes (ARIA labels)',
          'Non-responsive design patterns',
          'Outdated meta tags and SEO structure'
        ],
        crawlResults: {
          totalPages: 47,
          internalLinks: 234,
          externalLinks: 12,
          brokenLinks: 3,
          orphanedPages: 2,
          duplicateContent: 1
        }
      });
    } else {
      setAnalysisData({
        cms: 'WordPress 6.4.2',
        database: 'MySQL 8.0',
        files: 12847,
        mediaAssets: 2341,
        plugins: 23,
        themes: 3,
        size: '2.4 GB',
        serverConfig: 'Apache 2.4, PHP 8.1'
      });
    }
    
    setIsScanning(false);
    setScanComplete(true);
    
    // Pass the siteType to the parent component
    onNext(siteType);
  };

  const getDynamicAnalysisItems = () => [
    { label: 'CMS Detection', value: analysisData?.cms, icon: Globe, status: 'completed' },
    { label: 'Database Analysis', value: analysisData?.database, icon: Database, status: 'completed' },
    { label: 'File Structure', value: `${analysisData?.files} files`, icon: FileText, status: 'completed' },
    { label: 'Media Assets', value: `${analysisData?.mediaAssets} items`, icon: Image, status: 'completed' },
    { label: 'Server Config', value: analysisData?.serverConfig, icon: Server, status: 'completed' },
  ];

  const getStaticAnalysisItems = () => [
    { label: 'Site Type', value: analysisData?.siteType, icon: Globe, status: 'completed' },
    { label: 'Pages Crawled', value: `${analysisData?.pages} pages`, icon: FileText, status: 'completed' },
    { label: 'Total Files', value: `${analysisData?.files} files`, icon: FileText, status: 'completed' },
    { label: 'Media Assets', value: `${analysisData?.mediaAssets} items`, icon: Image, status: 'completed' },
    { label: 'Technologies', value: analysisData?.technologies?.join(', '), icon: Code, status: 'completed' },
  ];

  const analysisItems = siteType === 'static' ? getStaticAnalysisItems() : getDynamicAnalysisItems();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Analysis</h1>
          <p className="text-gray-600">Comprehensive scanning and analysis of your source website</p>
        </div>

        {/* Site Type Selection */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Website Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSiteType('dynamic')}
              className={`p-6 border rounded-lg text-left transition-colors ${
                siteType === 'dynamic'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Dynamic Website</h3>
              </div>
              <p className="text-sm text-gray-600">WordPress, Drupal, custom CMS, or database-driven sites</p>
            </button>
            
            <button
              onClick={() => setSiteType('static')}
              className={`p-6 border rounded-lg text-left transition-colors ${
                siteType === 'static'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Static Website</h3>
              </div>
              <p className="text-sm text-gray-600">HTML, CSS, JavaScript files without backend database</p>
            </button>
          </div>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Source Website</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                placeholder="Enter your website URL (e.g., https://yoursite.com)"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isScanning}
              />
            </div>
            <button
              onClick={handleScan}
              disabled={!sourceUrl || isScanning}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Analyze Site
                </>
              )}
            </button>
          </div>
        </div>

        {/* Static Site Modernization Options */}
        {siteType === 'static' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Modernization Options</h2>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={modernizeEnabled}
                  onChange={(e) => setModernizeEnabled(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Modernize Website During Migration</h3>
                  <p className="text-sm text-gray-600">Transform code to follow modern web standards while preserving design</p>
                </div>
              </label>
            </div>

            {modernizeEnabled && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries({
                    html5Semantic: 'Convert to semantic HTML5',
                    responsiveCSS: 'Ensure responsive design',
                    modernJS: 'Modernize JavaScript (ES6+)',
                    accessibility: 'Improve accessibility (WCAG)',
                    performance: 'Optimize for performance'
                  }).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={modernizationOptions[key as keyof typeof modernizationOptions]}
                        onChange={(e) => setModernizationOptions(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Transformation Instructions (Optional)
                  </label>
                  <textarea
                    value={designChanges}
                    onChange={(e) => setDesignChanges(e.target.value)}
                    placeholder="Describe any specific design changes you'd like to make during modernization..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Example: "Update color scheme to use modern gradients, replace old buttons with rounded modern style"
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Important Notice</h4>
                      <p className="text-sm text-yellow-800">
                        Modernization will analyze your site for potential copyright and trademark risks. 
                        We'll highlight any content that may require licensing or legal review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analysis Results */}
        {(isScanning || scanComplete) && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
            
            {isScanning && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-blue-600 mb-4">
                  <Loader className="w-8 h-8 animate-spin" />
                  <span className="text-lg font-medium">
                    {siteType === 'static' ? 'Crawling and analyzing static files...' : 'Analyzing your website...'}
                  </span>
                </div>
                <p className="text-gray-500">
                  {siteType === 'static' ? 'Discovering pages and analyzing code structure' : 'This may take a few moments'}
                </p>
              </div>
            )}

            {scanComplete && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{item.label}</h3>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Static Site Specific Results */}
        {scanComplete && siteType === 'static' && analysisData && (
          <>
            {/* Site Crawl Results */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Site Crawl Analysis</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysisData.crawlResults.totalPages}</div>
                  <div className="text-sm text-blue-800">Pages Found</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysisData.crawlResults.internalLinks}</div>
                  <div className="text-sm text-green-800">Internal Links</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{analysisData.crawlResults.brokenLinks}</div>
                  <div className="text-sm text-yellow-800">Broken Links</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analysisData.crawlResults.orphanedPages}</div>
                  <div className="text-sm text-purple-800">Orphaned Pages</div>
                </div>
              </div>
            </div>

            {/* Copyright & Trademark Risks */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Copyright & Trademark Analysis</h2>
              <div className="space-y-4">
                {analysisData.copyrightRisks.map((risk: string, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-900">Potential Risk Identified</h3>
                      <p className="text-sm text-red-800">{risk}</p>
                    </div>
                  </div>
                ))}
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Recommendation:</strong> Review identified content with legal counsel before migration. 
                    We can help replace flagged assets with licensed alternatives during the modernization process.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Quality Analysis */}
            {modernizeEnabled && (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Code Modernization Preview</h2>
                <div className="space-y-4">
                  {analysisData.codeIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                      <Code className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-yellow-900">Will be modernized</h3>
                        <p className="text-sm text-yellow-800">{issue}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900">Modernization Benefits</h3>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Improved SEO with semantic HTML5 structure</li>
                      <li>• Better accessibility compliance (WCAG 2.1)</li>
                      <li>• Enhanced mobile responsiveness</li>
                      <li>• Faster loading times and better performance</li>
                      <li>• Modern browser compatibility</li>
                      <li>• Cleaner, maintainable code structure</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Potential Issues for Dynamic Sites */}
        {scanComplete && siteType === 'dynamic' && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Potential Issues</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Large Media Files</h3>
                  <p className="text-sm text-gray-600">Some media files are over 10MB and may require optimization</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Plugin Dependencies</h3>
                  <p className="text-sm text-gray-600">23 plugins detected - compatibility will be verified in next step</p>
                </div>
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
            Back to Dashboard
          </button>
          
          {scanComplete && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Continue to Compatibility Check
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};