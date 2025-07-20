import React, { useState } from 'react';
import { Save, Plus, X, Edit } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const ExperienceEditor: React.FC = () => {
  const { data, updateExperience } = usePortfolio();
  const { isDark } = useTheme();
  const [experiences, setExperiences] = useState(data.experience);
  const [editingExperience, setEditingExperience] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      duration: '',
      description: '',
      skills: []
    };
    setExperiences(prev => [...prev, newExperience]);
    setEditingExperience(newExperience.id);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleExperienceChange = (id: string, field: string, value: string | string[]) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleSkillChange = (expId: string, index: number, value: string) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            skills: exp.skills.map((skill, i) => i === index ? value : skill)
          }
        : exp
    ));
  };

  const handleAddSkill = (expId: string) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === expId 
        ? { ...exp, skills: [...exp.skills, ''] }
        : exp
    ));
  };

  const handleRemoveSkill = (expId: string, index: number) => {
    setExperiences(prev => prev.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            skills: exp.skills.filter((_, i) => i !== index)
          }
        : exp
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cleanedExperiences = experiences
      .filter(exp => exp.title.trim() !== '')
      .map(exp => ({
        ...exp,
        skills: exp.skills.filter(skill => skill.trim() !== '')
      }));
    
    updateExperience(cleanedExperiences);
    setIsSaving(false);
    setEditingExperience(null);
    alert('Experience updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Experience</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddExperience}
            className={`flex items-center gap-2 px-4 py-2 ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
            } rounded-lg transition-colors duration-300`}
          >
            <Plus size={16} />
            <span>Add Experience</span>
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
        {experiences.map((experience) => (
          <div key={experience.id} className={`${
            isDark 
              ? 'bg-gray-900/50 border-gray-600' 
              : 'bg-gray-50/50 border-gray-300'
          } border rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {experience.title || 'New Experience'}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingExperience(editingExperience === experience.id ? null : experience.id)}
                  className={`p-2 ${
                    isDark 
                      ? 'text-cyan-400 hover:bg-cyan-600/20' 
                      : 'text-blue-600 hover:bg-blue-100'
                  } rounded-lg transition-colors duration-300`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleRemoveExperience(experience.id)}
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

            {editingExperience === experience.id && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
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
                      Company
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
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
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
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
                      Duration
                    </label>
                    <input
                      type="text"
                      value={experience.duration}
                      onChange={(e) => handleExperienceChange(experience.id, 'duration', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Description
                  </label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                        : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                    } border rounded-lg focus:outline-none transition-colors duration-300 resize-none`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Skills & Technologies
                    </label>
                    <button
                      onClick={() => handleAddSkill(experience.id)}
                      className={`flex items-center gap-1 px-2 py-1 text-xs ${
                        isDark 
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
                      } rounded transition-colors duration-300`}
                    >
                      <Plus size={12} />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-2">
                    {experience.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(experience.id, index, e.target.value)}
                          className={`flex-1 px-3 py-2 ${
                            isDark 
                              ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                              : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                          } border rounded-lg focus:outline-none transition-colors duration-300`}
                          placeholder="Skill name"
                        />
                        <button
                          onClick={() => handleRemoveSkill(experience.id, index)}
                          className={`p-1 ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-600/20' 
                              : 'text-red-600 hover:bg-red-100'
                          } rounded transition-colors duration-300`}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
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

export default ExperienceEditor;