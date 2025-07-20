import React, { useState } from 'react';
import { Save, Plus, X, Edit } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useTheme } from '../../contexts/ThemeContext';

const ProjectsEditor: React.FC = () => {
  const { data, updateProjects } = usePortfolio();
  const { isDark } = useTheme();
  const [projects, setProjects] = useState(data.projects);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      icon: 'Code'
    };
    setProjects(prev => [...prev, newProject]);
    setEditingProject(newProject.id);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const handleProjectChange = (id: string, field: string, value: string | string[]) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const handleTechnologyChange = (projectId: string, index: number, value: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            technologies: project.technologies.map((tech, i) => i === index ? value : tech)
          }
        : project
    ));
  };

  const handleAddTechnology = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, technologies: [...project.technologies, ''] }
        : project
    ));
  };

  const handleRemoveTechnology = (projectId: string, index: number) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            technologies: project.technologies.filter((_, i) => i !== index)
          }
        : project
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter out empty projects and clean technologies
    const cleanedProjects = projects
      .filter(project => project.title.trim() !== '')
      .map(project => ({
        ...project,
        technologies: project.technologies.filter(tech => tech.trim() !== '')
      }));
    
    updateProjects(cleanedProjects);
    setIsSaving(false);
    setEditingProject(null);
    alert('Projects updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Projects</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddProject}
            className={`flex items-center gap-2 px-4 py-2 ${
              isDark 
                ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-700'
            } rounded-lg transition-colors duration-300`}
          >
            <Plus size={16} />
            <span>Add Project</span>
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
        {projects.map((project) => (
          <div key={project.id} className={`${
            isDark 
              ? 'bg-gray-900/50 border-gray-600' 
              : 'bg-gray-50/50 border-gray-300'
          } border rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title || 'New Project'}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                  className={`p-2 ${
                    isDark 
                      ? 'text-cyan-400 hover:bg-cyan-600/20' 
                      : 'text-blue-600 hover:bg-blue-100'
                  } rounded-lg transition-colors duration-300`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleRemoveProject(project.id)}
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

            {editingProject === project.id && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
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
                      Icon (Lucide icon name)
                    </label>
                    <input
                      type="text"
                      value={project.icon}
                      onChange={(e) => handleProjectChange(project.id, 'icon', e.target.value)}
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
                    value={project.description}
                    onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                        : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                    } border rounded-lg focus:outline-none transition-colors duration-300 resize-none`}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => handleProjectChange(project.id, 'githubUrl', e.target.value)}
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
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => handleProjectChange(project.id, 'liveUrl', e.target.value)}
                      className={`w-full px-4 py-3 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                          : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                      } border rounded-lg focus:outline-none transition-colors duration-300`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Technologies Used
                    </label>
                    <button
                      onClick={() => handleAddTechnology(project.id)}
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
                    {project.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => handleTechnologyChange(project.id, index, e.target.value)}
                          className={`flex-1 px-3 py-2 ${
                            isDark 
                              ? 'bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white' 
                              : 'bg-white/50 border-gray-300 focus:border-blue-500 text-gray-900'
                          } border rounded-lg focus:outline-none transition-colors duration-300`}
                          placeholder="Technology name"
                        />
                        <button
                          onClick={() => handleRemoveTechnology(project.id, index)}
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

export default ProjectsEditor;