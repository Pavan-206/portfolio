import React from 'react';
import { Brain, Calendar, MapPin, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Experience = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();


  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Experience
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
            } transform md:-translate-x-0.5`}></div>
            
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="relative mb-8">
                <div className="flex items-center">
                  <div className={`absolute left-0 md:left-1/2 w-8 h-8 bg-gradient-to-r ${
                    isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
                  } rounded-full transform md:-translate-x-4 flex items-center justify-center`}>
                    <Brain className="text-white" size={16} />
                  </div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <div className={`${
                      isDark 
                        ? 'bg-gray-800/50 border-purple-400/50 hover:border-purple-400 hover:shadow-purple-400/10' 
                        : 'bg-white/50 border-purple-300/50 hover:border-purple-500 hover:shadow-purple-500/10'
                    } p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
                        <h3 className={`text-xl font-semibold ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>{exp.title}</h3>
                      </div>
                      
                      <div className={`flex items-center gap-4 mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className={isDark ? 'text-cyan-400' : 'text-blue-600'} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      <p className={`${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      } mb-6 leading-relaxed`}>
                        {exp.description}
                      </p>

                      {exp.skills.length > 0 && (
                        <div>
                          <h4 className={`text-sm font-semibold ${
                            isDark ? 'text-cyan-400' : 'text-blue-600'
                          } mb-3`}>Key Learning Areas:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {exp.skills.map((skill) => (
                              <div
                                key={skill}
                                className={`px-3 py-2 text-xs ${
                                  isDark 
                                    ? 'bg-gray-900/50 border-gray-600 text-gray-300 hover:border-cyan-400/50' 
                                    : 'bg-gray-100/50 border-gray-300 text-gray-700 hover:border-blue-500/50'
                                } border rounded-lg transition-colors duration-300`}
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;