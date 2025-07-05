import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  CheckCircle, 
  ArrowRightLeft, 
  Shield, 
  FileText,
  Zap
} from 'lucide-react';
import { ActiveStep } from '../App';

interface SidebarProps {
  activeStep: ActiveStep;
  onStepChange: (step: ActiveStep) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeStep, onStepChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Site Analysis', icon: Search },
    { id: 'compatibility', label: 'Compatibility', icon: CheckCircle },
    { id: 'migration', label: 'Migration', icon: ArrowRightLeft },
    { id: 'validation', label: 'Validation', icon: Shield },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">MigrateAI</h1>
            <p className="text-sm text-slate-400">Migration Tool</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onStepChange(item.id as ActiveStep)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeStep === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};