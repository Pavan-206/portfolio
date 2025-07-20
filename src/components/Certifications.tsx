import React from 'react';
import { Award, BookOpen, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Certifications = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const getCertificationColor = (index: number) => {
    const colors = [
      isDark ? 'from-blue-400 to-cyan-400' : 'from-blue-500 to-blue-600',
      isDark ? 'from-green-400 to-emerald-400' : 'from-green-500 to-green-600',
      isDark ? 'from-purple-400 to-pink-400' : 'from-purple-500 to-purple-600',
      isDark ? 'from-yellow-400 to-orange-400' : 'from-yellow-500 to-orange-500',
      isDark ? 'from-red-400 to-pink-400' : 'from-red-500 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Certifications
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              Continuous learning and professional development through industry-recognized certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.certifications.map((cert, index) => (
              <div
                key={cert.id}
                className={`p-6 ${
                  isDark ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 hover:shadow-cyan-400/10' : 'bg-white/50 border-gray-200 hover:border-blue-500/50 hover:shadow-blue-500/10'
                } rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${getCertificationColor(index)} bg-opacity-20`}>
                    <Award className={`${
                      isDark ? 'text-white' : 'text-gray-900'
                    } group-hover:scale-110 transition-transform duration-300`} size={24} />
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 ${
                        isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'
                      } transition-colors duration-300`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-blue-600'
                } mb-2 transition-colors duration-300`}>
                  {cert.title}
                </h3>
                
                <p className={`${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } mb-3`}>{cert.provider}</p>
                
                <div className="flex items-center gap-2">
                  <BookOpen className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={16} />
                  <span className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{cert.category}</span>
                </div>

                <div className={`mt-4 pt-4 border-t ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>Verified</span>
                    <div className={`w-2 h-2 rounded-full ${
                      isDark ? 'bg-green-400' : 'bg-green-500'
                    } animate-pulse`}></div>
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

export default Certifications;