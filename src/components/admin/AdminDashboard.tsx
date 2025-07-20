import React, { useState } from 'react';
import { 
  User, 
  Code, 
  Briefcase, 
  Award, 
  FileText, 
  Settings, 
  LogOut,
  RotateCcw,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';
import PersonalInfoEditor from './PersonalInfoEditor';
import SkillsEditor from './SkillsEditor';
import ProjectsEditor from './ProjectsEditor';
import ExperienceEditor from './ExperienceEditor';
import AchievementsEditor from './AchievementsEditor';
import CertificationsEditor from './CertificationsEditor';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { logout, user } = useAuth();
  const { resetToDefaults } = usePortfolio();
  const { isDark } = useTheme();

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: FileText },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This action cannot be undone.')) {
      resetToDefaults();
      alert('Portfolio data has been reset to defaults.');
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'achievements':
        return <AchievementsEditor />;
      case 'certifications':
        return <CertificationsEditor />;
      default:
        return <PersonalInfoEditor />;
    }
  };

  return (
    <div className={`min-h-screen ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className={`${
        isDark 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/50 border-gray-200'
      } border-b backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Portfolio Admin</h1>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Welcome back, {user?.email}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handlePreview}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDark 
                    ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
                } rounded-lg transition-colors duration-300`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
              
              <button
                onClick={handleReset}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDark 
                    ? 'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400' 
                    : 'bg-yellow-100/50 hover:bg-yellow-200 text-yellow-700'
                } rounded-lg transition-colors duration-300`}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
              
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDark 
                    ? 'bg-red-600/20 hover:bg-red-600/30 text-red-400' 
                    : 'bg-red-100/50 hover:bg-red-200 text-red-700'
                } rounded-lg transition-colors duration-300`}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-200'
            } rounded-xl border backdrop-blur-md p-6`}>
              <h2 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-4`}>Sections</h2>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? isDark
                            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-400/30'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                          : isDark
                            ? 'text-gray-300 hover:bg-gray-700/50'
                            : 'text-gray-700 hover:bg-gray-100/50'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`${
              isDark 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/50 border-gray-200'
            } rounded-xl border backdrop-blur-md p-6`}>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;