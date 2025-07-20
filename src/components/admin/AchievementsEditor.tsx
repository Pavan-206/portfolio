import React, { useState } from 'react';
import { Save, Plus, X, Edit } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const AchievementsEditor: React.FC = () => {
  const { data, updateAchievements } = usePortfolio();
  const { isDark } = useTheme();
  const [achievements, setAchievements] = useState(data.achievements);
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      category: '',
      items: []
    };
    setAchievements(prev => [...prev, newAchievement]);
    setEditingAchievement(newAchievement.id);
  };

  const handleRemoveAchievement = (id: string) => {
    setAchievements(prev => prev.filter(achievement => achievement.id !== id));
  };

  const handleAchievementChange = (id: string, field: string, value: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const handleItemChange = (achievementId: string, index: number, field: string, value: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { 
            ...achievement, 
            items: achievement.items.map((item, i) => 
              i === index ? { ...item, [field]: value } : item
            )
          }
        : achievement
    ));
  };

  const handleAddItem = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { 
            ...achievement, 
            items: [...achievement.items, { name: '', value: '', description: '' }]
          }
        : achievement
    ));
  };

  const handleRemoveItem = (achievementId: string, index: number) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { 
            ...achievement, 
            items: achievement.items.filter((_, i) => i !== index)
          }
        : achievement
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const cleanedAchievements = achievements
      .filter(achievement => achievement.title.trim() !== '')
      .map(achievement => ({
        ...achievement,
        items: achievement.items.filter(item => item.name.trim() !== '' && item.value.trim() !== '')
      }));
    
    updateAchievements(cleanedAchievements);
    setIsSaving(false);
    setEditingAchievement(null);
    alert('Achievements updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Achievements</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddAchievement}
            className={`flex items-center gap-2 px-4 py-2 ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
            } rounded-lg transition-colors duration-300`}
          >
            <Plus size={16} />
            <span>Add Achievement</span>
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
        {achievements.map((achievement) => (
          <div key={achievement.id} className={`${
            isDark 
              ? 'bg-gray-900/50 border-gray-600' 
              : 'bg-gray-50/50 border-gray-300'
          } border rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {achievement.title || 'New Achievement'}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingAchievement(editingAchievement === achievement.id ? null : achievement.id)}
                  className={`p-2 ${
                    isDark 
                      ? 'text-cyan-400 hover:bg-cyan-600/20' 
                      : 'text-blue-600 hover:bg-blue-100'
                  } rounded-lg transition-colors duration-300`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleRemoveAchievement(achievement.id)}
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

            {editingAchievement === achievement.id && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Title
                    </label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(achievement.id, 'title', e.target.value)}
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
                      Category
                    </label>
                    <input
                      type="text"
                      value={achievement.category}
                      onChange={(e) => handleAchievementChange(achievement.id, 'category', e.target.value)}
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
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(achievement.id, 'description', e.target.value)}
                    rows={2}
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
                      Achievement Items
                    </label>
                    <button
                      onClick={() => handleAddItem(achievement.id)}
                      className={`flex items-center gap-1 px-2 py-1 text-xs ${
                        isDark 
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
                      } rounded transition-colors duration-300`}
                    >
                      <Plus size={12} />
                      <span>Add Item</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {achievement.items.map((item, index) => (
                      <div key={index} className={`${
                        isDark ? 'bg-gray-800/30' : 'bg-white/30'
                      } rounded-lg p-4`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>Item {index + 1}</span>
                          <button
                            onClick={() => handleRemoveItem(achievement.id, index)}
                            className={`p-1 ${
                              isDark 
                                ? 'text-red-400 hover:bg-red-600/20' 
                                : 'text-red-600 hover:bg-red-100'
                            } rounded transition-colors duration-300`}
                          >
                            <X size={12} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(achievement.id, index, 'name', e.target.value)}
                            placeholder="Name"
                            className={`px-3 py-2 ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 focus:border-cyan-400 text-white' 
                                : 'bg-gray-100/50 border-gray-300 focus:border-blue-500 text-gray-900'
                            } border rounded-lg focus:outline-none transition-colors duration-300`}
                          />
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleItemChange(achievement.id, index, 'value', e.target.value)}
                            placeholder="Value"
                            className={`px-3 py-2 ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 focus:border-cyan-400 text-white' 
                                : 'bg-gray-100/50 border-gray-300 focus:border-blue-500 text-gray-900'
                            } border rounded-lg focus:outline-none transition-colors duration-300`}
                          />
                          <input
                            type="text"
                            value={item.description || ''}
                            onChange={(e) => handleItemChange(achievement.id, index, 'description', e.target.value)}
                            placeholder="Description (optional)"
                            className={`px-3 py-2 ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 focus:border-cyan-400 text-white' 
                                : 'bg-gray-100/50 border-gray-300 focus:border-blue-500 text-gray-900'
                            } border rounded-lg focus:outline-none transition-colors duration-300`}
                          />
                        </div>
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

export default AchievementsEditor;