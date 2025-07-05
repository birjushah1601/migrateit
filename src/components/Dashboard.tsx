import React from 'react';
import { 
  Globe, 
  Server, 
  Database, 
  Shield, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

interface DashboardProps {
  onNext: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNext }) => {
  const stats = [
    { label: 'Successful Migrations', value: '2,847', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Projects', value: '156', icon: Users, color: 'text-blue-600' },
    { label: 'Average Migration Time', value: '4.2h', icon: Clock, color: 'text-purple-600' },
    { label: 'Uptime Maintained', value: '99.9%', icon: Shield, color: 'text-emerald-600' },
  ];

  const recentMigrations = [
    { site: 'ecommerce-store.com', status: 'Completed', time: '2 hours ago', type: 'WordPress' },
    { site: 'corporate-site.net', status: 'In Progress', time: '4 hours ago', type: 'Drupal' },
    { site: 'blog-platform.org', status: 'Validating', time: '6 hours ago', type: 'Custom' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MigrateAI</h1>
          <p className="text-gray-600">Your comprehensive solution for seamless website migrations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Migration Process */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Migration Process</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Site Analysis</h3>
                  <p className="text-sm text-gray-600">Comprehensive scanning of source website structure</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Server className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Compatibility Check</h3>
                  <p className="text-sm text-gray-600">Verify hosting environment requirements</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Automated Migration</h3>
                  <p className="text-sm text-gray-600">Seamless transfer with zero downtime</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onNext}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Start New Migration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Migrations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Migrations</h2>
            <div className="space-y-4">
              {recentMigrations.map((migration, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-gray-900 text-sm">{migration.site}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      migration.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      migration.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {migration.status}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {migration.type} • {migration.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};