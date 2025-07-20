import React from 'react';
import { Trophy, Code, Award, Star, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Achievements = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const getIconComponent = (category: string) => {
    const icons: { [key: string]: React.ElementType } = {
      Programming: Code,
      Awards: Trophy,
      Leadership: Users,
      Competition: Award
    };
    return icons[category] || Award;
  };

  const getItemColor = (index: number) => {
    const colors = [
      isDark ? 'text-yellow-400' : 'text-yellow-600',
      isDark ? 'text-orange-400' : 'text-orange-600',
      isDark ? 'text-green-400' : 'text-green-600',
      isDark ? 'text-blue-400' : 'text-blue-600',
      isDark ? 'text-purple-400' : 'text-purple-600',
      isDark ? 'text-cyan-400' : 'text-blue-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <section id="achievements" className={`py-20 ${
      isDark ? 'bg-black/20' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Achievements
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              Recognition and accomplishments that reflect my dedication to continuous learning and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.achievements?.map((achievement, index) => {
              const IconComponent = getIconComponent(achievement.category);
              return (
                <div
                  key={achievement.id ?? index}
                  className={`p-6 ${
                    isDark ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 hover:shadow-cyan-400/10' : 'bg-white/50 border-gray-200 hover:border-blue-500/50 hover:shadow-blue-500/10'
                  } rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${
                      isDark ? 'from-yellow-400/20 to-orange-400/20' : 'from-yellow-500/20 to-orange-500/20'
                    }`}>
                      <IconComponent className={`${
                        isDark ? 'text-yellow-400' : 'text-yellow-600'
                      } group-hover:scale-110 transition-transform duration-300`} size={24} />
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{achievement.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {achievement.items?.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`p-4 ${
                          isDark ? 'bg-gray-900/50 hover:bg-gray-900/70' : 'bg-gray-100/50 hover:bg-gray-200/70'
                        } rounded-lg transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>{item.name}</span>
                          <span className={`font-bold ${getItemColor(itemIndex)}`}>
                            {item.value}
                          </span>
                        </div>
                        
                        {item.description && (
                          <div className="flex items-center justify-between mb-2">
                            <p className={`${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            } text-sm`}>{item.description}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-end">
                          <Star className={`${getItemColor(itemIndex)} animate-pulse`} size={16} />
                        </div>
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

export default Achievements;