import { User, Heart, Lightbulb, Users, Zap, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const About = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const softSkills = [
    { icon: Users, label: 'Teamwork', color: isDark ? 'text-cyan-400' : 'text-blue-600' },
    { icon: Zap, label: 'Adaptability', color: isDark ? 'text-purple-400' : 'text-purple-600' },
    { icon: Lightbulb, label: 'Problem-solving', color: isDark ? 'text-yellow-400' : 'text-yellow-600' },
    { icon: Target, label: 'Leadership', color: isDark ? 'text-green-400' : 'text-green-600' },
  ];

  return (
    <section id="about" className={`py-20 ${
      isDark ? 'bg-black/20' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                About Me
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className={isDark ? 'text-cyan-400' : 'text-blue-600'} size={24} />
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>My Journey</h3>
              </div>
              
              <p className={`${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } text-lg leading-relaxed`}>
                {data.personalInfo.about}
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <Heart className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  My passion lies in <span className={`${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  } font-semibold`}>programming</span>, 
                  <span className={`${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  } font-semibold`}> data management</span>, and 
                  <span className={`${
                    isDark ? 'text-yellow-400' : 'text-yellow-600'
                  } font-semibold`}> building innovative projects</span> that solve real-world problems.
                </p>
              </div>
              
              <p className={`${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } text-lg leading-relaxed`}>
                I thrive on turning complex ideas into efficient, scalable solutions while continuously 
                learning and adapting to new technologies. My goal is to contribute to meaningful projects 
                that make a positive impact on society.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className={`text-2xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-6`}>Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.label}
                      className={`p-6 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400/50 hover:shadow-cyan-400/10' 
                          : 'bg-white/50 border-gray-200 hover:border-blue-500/50 hover:shadow-blue-500/10'
                      } rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                    >
                      <IconComponent className={`${skill.color} group-hover:scale-110 transition-transform duration-300 mb-3`} size={32} />
                      <h4 className={`${
                        isDark ? 'text-white' : 'text-gray-900'
                      } font-semibold`}>{skill.label}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

