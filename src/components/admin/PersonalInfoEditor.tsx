import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const PersonalInfoEditor: React.FC = () => {
  const { data, updatePersonalInfo } = usePortfolio();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(data.personalInfo);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
    updatePersonalInfo(formData);
    setIsSaving(false);
    alert('Personal information updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Personal Information</h2>
        
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

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Professional Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            GitHub URL
          </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          } mb-2`}>
            Resume URL
          </label>
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className={`w-full px-4 py-3 ${
              isDark 
                ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
            } border rounded-lg focus:outline-none transition-colors duration-300`}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className={`block text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        } mb-2`}>
          About Me
        </label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 ${
            isDark 
              ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
              : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
          } border rounded-lg focus:outline-none transition-colors duration-300 resize-none`}
        />
      </div>
    </div>
  );
};

export default PersonalInfoEditor;