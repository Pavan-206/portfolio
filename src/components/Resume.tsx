import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Resume = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  return (
    <section id="resume" className={`py-20 ${
      isDark ? 'bg-black/20' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Resume
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              Download my complete resume or view it online to learn more about my experience and qualifications.
            </p>
          </div>

          <div className={`${
            isDark 
              ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400/50' 
              : 'bg-white/50 border-gray-200 hover:border-blue-500/50'
          } rounded-xl border transition-all duration-300 p-8`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className={`w-24 h-24 bg-gradient-to-r ${
                  isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-500 to-purple-500'
                } rounded-xl flex items-center justify-center p-1`}>
                  <div className={`w-full h-full ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  } rounded-lg flex items-center justify-center`}>
                    <FileText className={isDark ? 'text-white' : 'text-gray-900'} size={40} />
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                } mb-3`}>
                  K Pavan Kumar - Resume
                </h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-6`}>
                  Complete overview of my education, experience, projects, skills, and achievements. 
                  Updated regularly to reflect my latest accomplishments and capabilities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href={data.personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${
                      isDark 
                        ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-500/25' 
                        : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'
                    } rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-white`}
                  >
                    <Download size={20} />
                    <span className="font-semibold">Download PDF</span>
                  </a>
                  
                  <a
                    href={data.personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-3 px-6 py-3 ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 hover:border-cyan-400/50 hover:bg-gray-700' 
                        : 'bg-gray-100/50 border-gray-300 hover:border-blue-500/50 hover:bg-gray-200'
                    } border rounded-lg transition-all duration-300 hover:scale-105`}
                  >
                    <Eye size={20} />
                    <span className="font-semibold">View Online</span>
                  </a>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-8 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className={`p-4 ${
                  isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'
                } rounded-lg`}>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  } mb-1`}>5+</div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Programming Languages</div>
                </div>
                <div className={`p-4 ${
                  isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'
                } rounded-lg`}>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  } mb-1`}>3</div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Major Projects</div>
                </div>
                <div className={`p-4 ${
                  isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'
                } rounded-lg`}>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  } mb-1`}>5+</div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>Certifications</div>
                </div>
                <div className={`p-4 ${
                  isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'
                } rounded-lg`}>
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  } mb-1`}>1</div>
                  <div className={`text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>AI/ML Internship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;