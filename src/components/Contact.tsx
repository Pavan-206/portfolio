import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Phone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

const Contact = () => {
  const { isDark } = useTheme();
  const { data } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data.personalInfo.email,
      href: `mailto:${data.personalInfo.email}`,
      color: isDark ? 'text-cyan-400' : 'text-blue-600'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.personalInfo.location,
      href: null,
      color: isDark ? 'text-purple-400' : 'text-purple-600'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View Projects',
      href: data.personalInfo.github,
      color: isDark ? 'text-green-400' : 'text-green-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: data.personalInfo.linkedin,
      color: isDark ? 'text-blue-400' : 'text-blue-500'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className={`bg-gradient-to-r ${
                isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Get In Touch
              </span>
            </h2>
            <div className={`w-20 h-1 bg-gradient-to-r ${
              isDark ? 'from-cyan-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } mx-auto mb-8`}></div>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-700'
            } text-lg max-w-2xl mx-auto`}>
              Ready to collaborate on exciting projects or discuss opportunities? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                } mb-6`}>Let's Connect</h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-8 leading-relaxed`}>
                  I'm always open to discussing new opportunities, innovative projects, 
                  and potential collaborations. Whether you have a question about my work 
                  or want to explore how we can work together, feel free to reach out.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={info.label}
                      className={`flex items-center gap-4 p-4 ${
                        isDark 
                          ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-400/50' 
                          : 'bg-white/50 border-gray-200 hover:border-blue-500/50'
                      } rounded-lg border transition-all duration-300 hover:scale-105 group`}
                    >
                      <div className={`p-3 rounded-lg ${
                        isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'
                      } ${info.color}`}>
                        <IconComponent className="group-hover:scale-110 transition-transform duration-300" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`${
                          isDark ? 'text-white' : 'text-gray-900'
                        } font-semibold mb-1`}>{info.label}</h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : '_self'}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                            className={`${info.color} hover:underline transition-colors duration-300`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{info.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${
              isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
            } rounded-xl border p-8`}>
              <h3 className={`text-2xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-6`}>Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400' 
                        : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                    } border rounded-lg focus:outline-none transition-colors duration-300`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400' 
                        : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                    } border rounded-lg focus:outline-none transition-colors duration-300`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400' 
                        : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                    } border rounded-lg focus:outline-none transition-colors duration-300 resize-none`}
                    placeholder="Tell me about your project or say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${
                    isDark 
                      ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-500/25' 
                      : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'
                  } rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-white`}
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;