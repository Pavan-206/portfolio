import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const SkillsEditor: React.FC = () => {
  const { data, updateSkills } = usePortfolio();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(data.skills);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = (category: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], '']
    }));
  };

  const handleRemoveSkill = (category: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (category: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].map((skill, i) => i === index ? value : skill)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter out empty skills
    const cleanedData = {
      languages: formData.languages.filter(skill => skill.trim() !== ''),
      frameworks: formData.frameworks.filter(skill => skill.trim() !== ''),
      databases: formData.databases.filter(skill => skill.trim() !== ''),
      tools: formData.tools.filter(skill => skill.trim() !== ''),
      subjects: formData.subjects.filter(skill => skill.trim() !== '')
    };
    
    updateSkills(cleanedData);
    setIsSaving(false);
    alert('Skills updated successfully!');
  };

  const categories = [
    { key: 'languages' as const, label: 'Programming Languages' },
    { key: 'frameworks' as const, label: 'Libraries & Frameworks' },
    { key: 'databases' as const, label: 'Databases' },
    { key: 'tools' as const, label: 'Tools & Technologies' },
    { key: 'subjects' as const, label: 'Relevant Subjects' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Skills & Technologies</h2>
        
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

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.key}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>{category.label}</h3>
              
              <button
                onClick={() => handleAddSkill(category.key)}
                className={`flex items-center gap-2 px-3 py-2 ${
                  isDark 
                    ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
                } rounded-lg transition-colors duration-300`}
              >
                <Plus size={16} />
                <span>Add Skill</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {formData[category.key].map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(category.key, index, e.target.value)}
                    className={`flex-1 px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white' 
                        : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900'
                    } border rounded-lg focus:outline-none transition-colors duration-300`}
                    placeholder={`Enter ${category.label.toLowerCase()}`}
                  />
                  <button
                    onClick={() => handleRemoveSkill(category.key, index)}
                    className={`p-2 ${
                      isDark 
                        ? 'text-red-400 hover:bg-red-600/20' 
                        : 'text-red-600 hover:bg-red-100'
                    } rounded-lg transition-colors duration-300`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsEditor;