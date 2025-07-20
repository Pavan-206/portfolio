import React from 'react';
import { Code, Database, Wrench, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Skills = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      skills: data.skills.languages,
      color: isDark ? 'from-cyan-400 to-blue-400' : 'from-blue-500 to-blue-600',
      borderColor: isDark ? 'border-cyan-400/50' : 'border-blue-500/50'
    },
    {
      icon: Wrench,
      title: 'Libraries & Frameworks',
      skills: data.skills.frameworks,
      color: isDark ? 'from-purple-400 to-pink-400' : 'from-purple-500 to-purple-600',
      borderColor: isDark ? 'border-purple-400/50' : 'border-purple-500/50'
    },
    {
      icon: Database,
      title: 'Databases',
      skills: data.skills.databases,
      color: isDark ? 'from-green-400 to-emerald-400' : 'from-green-500 to-green-600',
      borderColor: isDark ? 'border-green-400/50' : 'border-green-500/50'
    },
    {
      icon: Wrench,
      title: 'Tools & Tech',
      skills: data.skills.tools,
      color: isDark ? 'from-yellow-400 to-orange-400' : 'from-yellow-500 to-orange-500',
      borderColor: isDark ? 'border-yellow-400/50' : 'border-yellow-500/50'
    },
    {
      icon: BookOpen,
      title: 'Relevant Subjects',
      skills: data.skills.subjects,
      color: isDark ? 'from-red-400 to-pink-400' : 'from-red-500 to-pink-500',
      borderColor: isDark ? 'border-red-400/50' : 'border-red-500/50'
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Skills & Technologies
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.title}
                  className={`p-6 ${
                    isDark ? 'bg-gray-800/50' : 'bg-white/50'
                  } rounded-xl border ${category.borderColor} hover:border-opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isDark ? 'hover:shadow-cyan-400/10' : 'hover:shadow-blue-500/10'
                  } group`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-20`}>
                      <IconComponent className={`${
                        isDark ? 'text-white' : 'text-gray-900'
                      } group-hover:scale-110 transition-transform duration-300`} size={24} />
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{category.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className={`flex items-center justify-between p-3 ${
                          isDark 
                            ? 'bg-gray-900/50 hover:bg-gray-900/70' 
                            : 'bg-gray-50/50 hover:bg-gray-100/70'
                        } rounded-lg transition-all duration-300`}
                      >
                        <span className={`${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        } font-medium`}>{skill}</span>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                          isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
                        } animate-pulse`}></div>
                      </div>
                    ))}
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

export default Skills;