import React from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import TypingAnimation from './TypingAnimation';
import profileImg from '../assets/profile.png';

const Hero = () => {
  const { isDark } = useTheme();

  const typingTexts = [
    'Aspiring Full-Stack Developer',
    'AI & ML Enthusiast',
    'Cloud Manager'
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-r from-purple-900/20 to-cyan-900/20'
              : 'bg-gradient-to-r from-blue-100/30 to-purple-100/30'
          }`}
        ></div>
        {/* Floating particles */}
        <div
          className={`absolute top-1/4 left-1/4 w-2 h-2 ${
            isDark ? 'bg-cyan-400' : 'bg-blue-500'
          } rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-1 h-1 ${
            isDark ? 'bg-purple-400' : 'bg-purple-500'
          } rounded-full animate-pulse animation-delay-1000`}
        ></div>
        <div
          className={`absolute top-1/2 left-3/4 w-1.5 h-1.5 ${
            isDark ? 'bg-cyan-300' : 'bg-blue-400'
          } rounded-full animate-pulse animation-delay-2000`}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-12 text-center md:text-left relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Left Content Section */}
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span
                className={`bg-gradient-to-r ${
                  isDark
                    ? 'from-cyan-400 via-purple-400 to-cyan-400'
                    : 'from-blue-600 via-purple-600 to-blue-600'
                } bg-clip-text text-transparent animate-pulse`}
              >
                K Pavan Kumar
              </span>
            </h1>

            <h2 className="mb-6 min-h-[3rem] flex items-center justify-start md:justify-start">
              <TypingAnimation texts={typingTexts} />
            </h2>

            <p
              className={`text-xl md:text-2xl ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              } mb-12 font-light`}
            >
              "Turning ideas into efficient, scalable solutions."
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-12">
              <a
                href="https://github.com/pavankumar-037"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400 hover:shadow-cyan-400/25'
                    : 'bg-white/50 border-gray-300 hover:border-blue-500 hover:shadow-blue-500/25'
                } border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <Github size={20} />
                <span>GitHub</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/kanikepavankumar-pk967624"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400 hover:shadow-cyan-400/25'
                    : 'bg-white/50 border-gray-300 hover:border-blue-500 hover:shadow-blue-500/25'
                } border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="mailto:kanikepavankumar06@gmail.com"
                className={`flex items-center gap-2 px-6 py-3 ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400 hover:shadow-cyan-400/25'
                    : 'bg-white/50 border-gray-300 hover:border-blue-500 hover:shadow-blue-500/25'
                } border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <Mail size={20} />
                <span>Email</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1W9x9Hg_x4zyqEQ-m5wG3kSO6CvfuF4kL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${
                  isDark
                    ? 'from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 hover:shadow-purple-500/25'
                    : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'
                } rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-white`}
              >
                <Download size={20} />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Right Profile Image */}
          <div
            className={`w-72 h-80 rounded-2xl overflow-hidden transition-transform hover:scale-105 ${
              isDark
                ? 'shadow-[0_0_30px_5px_rgba(34,211,238,0.4)]'
                : 'shadow-[0_0_25px_5px_rgba(59,130,246,0.3)]'
            }`}
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-contain object-top"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-8">
          <div
            className={`w-6 h-10 border-2 ${
              isDark ? 'border-cyan-400' : 'border-blue-500'
            } rounded-full flex justify-center mx-auto`}
          >
            <div
              className={`w-1 h-3 ${
                isDark ? 'bg-cyan-400' : 'bg-blue-500'
              } rounded-full mt-2 animate-pulse`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;