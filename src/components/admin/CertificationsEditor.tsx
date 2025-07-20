import React, { useState } from 'react';
import { Save, Plus, X, Edit } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const CertificationsEditor: React.FC = () => {
  const { data, updateCertifications } = usePortfolio();
  const { isDark } = useTheme();
  const [certifications, setCertifications] = useState(data.certifications);
  const [editingCertification, setEditingCertification] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      title: '',
      provider: '',
      category: '',
      url: ''
    };
    setCertifications(prev => [...prev, newCertification]);
    setEditingCertification(newCertification.id);
  };

  const handleRemoveCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const handleCertificationChange = (id: string, field: string, value: string) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cleanedCertifications = certifications.filter(cert => cert.title.trim() !== '');
    
    updateCertifications(cleanedCertifications);
    setIsSaving(false);
    setEditingCertification(null);
    alert('Certifications updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Certifications</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddCertification}
            className={`flex items-center gap-2 px-4 py-2 ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
            } rounded-lg transition-colors duration-300`}
          >
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${
              isDark 
                ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500' 
                : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
            } rounded-lg transition-all duration-300 hover:scale-105 text-white disabled:opacity-50`}
          >
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {certifications.map((certification) => (
          <div key={certification.id} className={`${
            isDark 
              ? 'bg-gray-900/50 border-gray-600' 
              : 'bg-gray-50/50 border-gray-300'
          } border rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {certification.title || 'New Certification'}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingCertification(editingCertification === certification.id ? null : certification.id)}
                  className={`p-2 ${
                    isDark 
                      ? 'text-cyan-400 hover:bg-cyan-600/20' 
                      : 'text-blue-600 hover:bg-blue-100'
                  } rounded-lg transition-colors duration-300`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleRemoveCertification(certification.id)}
                  className={`p-2 ${
                    isDark 
                      ? 'text-red-400 hover:bg-red-600/20' 
                      : 'text-red-600 hover:bg-red-100'
                  } rounded-lg transition-colors duration-300`}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {editingCertification === certification.id && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Certification Title
                    </label>
                    <input
                      type="text"
                      value={certification.title}
                      onChange={(e) => handleCertificationChange(certification.id, 'title', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Provider
                    </label>
                    <input
                      type="text"
                      value={certification.provider}
                      onChange={(e) => handleCertificationChange(certification.id, 'provider', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Category
                    </label>
                    <input
                      type="text"
                      value={certification.category}
                      onChange={(e) => handleCertificationChange(certification.id, 'category', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Certificate URL (optional)
                    </label>
                    <input
                      type="url"
                      value={certification.url || ''}
                      onChange={(e) => handleCertificationChange(certification.id, 'url', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsEditor;