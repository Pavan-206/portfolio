import React from 'react';
import { ExternalLink, Github, Lock, GraduationCap, UtensilsCrossed, Code } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Projects = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Lock,
      GraduationCap,
      UtensilsCrossed,
      Code
    };
    return icons[iconName] || Code;
  };

  const getProjectColor = (index: number) => {
    const colors = [
      {
        color: isDark ? 'from-cyan-400 to-blue-400' : 'from-blue-500 to-blue-600',
        borderColor: isDark ? 'border-cyan-400/50' : 'border-blue-500/50'
      },
      {
        color: isDark ? 'from-purple-400 to-pink-400' : 'from-purple-500 to-purple-600',
        borderColor: isDark ? 'border-purple-400/50' : 'border-purple-500/50'
      },
      {
        color: isDark ? 'from-green-400 to-emerald-400' : 'from-green-500 to-green-600',
        borderColor: isDark ? 'border-green-400/50' : 'border-green-500/50'
      },
      {
        color: isDark ? 'from-yellow-400 to-orange-400' : 'from-yellow-500 to-orange-500',
        borderColor: isDark ? 'border-yellow-400/50' : 'border-yellow-500/50'
      },
      {
        color: isDark ? 'from-red-400 to-pink-400' : 'from-red-500 to-pink-500',
        borderColor: isDark ? 'border-red-400/50' : 'border-red-500/50'
      }
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="projects" className={`py-20 ${
      isDark ? 'bg-black/20' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Featured Projects
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              A showcase of my technical projects demonstrating problem-solving skills and practical application of various technologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {data.projects.map((project, index) => {
              const IconComponent = getIconComponent(project.icon);
              const projectColors = getProjectColor(index);
              return (
                <div
                  key={project.title}
                  className={`p-6 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  } rounded-xl border ${projectColors.borderColor} hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isDark ? 'hover:shadow-cyan-400/10' : 'hover:shadow-blue-500/10'
                  } group`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${projectColors.color} bg-opacity-20`}>
                      <IconComponent className={`${
                        isDark ? 'text-white' : 'text-gray-900'
                      } group-hover:scale-110 transition-transform duration-300`} size={24} />
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{project.title}</h3>
                  </div>

                  <p className={`${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-6 leading-relaxed`}>
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    } mb-3`}>Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs ${
                            isDark 
                              ? 'bg-gray-900/50 border-gray-600 text-gray-300 hover:border-cyan-400/50' 
                              : 'bg-gray-100/50 border-gray-300 text-gray-700 hover:border-blue-500/50'
                          } border rounded-full transition-colors duration-300`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        isDark 
                          ? 'bg-gray-900/50 border-gray-600 hover:border-cyan-400/50' 
                          : 'bg-gray-100/50 border-gray-300 hover:border-blue-500/50'
                      } border rounded-lg transition-all duration-300 hover:scale-105 text-sm`}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.liveUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${
                        isDark 
                          ? 'from-purple-600/50 to-cyan-600/50 border-purple-400/50 hover:from-purple-600 hover:to-cyan-600' 
                          : 'from-blue-600/50 to-purple-600/50 border-blue-400/50 hover:from-blue-600 hover:to-purple-600'
                      } border rounded-lg transition-all duration-300 hover:scale-105 text-sm text-white`}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;