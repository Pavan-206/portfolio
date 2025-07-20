import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      <div className="max-w-md w-full mx-4">
        <div
          className={`${
            isDark
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white/50 border-gray-200'
          } rounded-xl border backdrop-blur-md p-8 shadow-xl`}
        >
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${
                isDark
                  ? 'from-cyan-400 to-purple-400'
                  : 'from-blue-500 to-purple-500'
              } rounded-xl flex items-center justify-center mx-auto mb-4`}
            >
              <Shield className="text-white" size={32} />
            </div>
            <h1
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-2`}
            >
              Admin Login
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Access the portfolio dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-2`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400'
                      : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  } border rounded-lg focus:outline-none transition-colors duration-300`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  size={20}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-12 py-3 ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400'
                      : 'bg-gray-50/50 border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                  } border rounded-lg focus:outline-none transition-colors duration-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                  } transition-colors duration-300`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r ${
                isDark
                  ? 'from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500'
                  : 'from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
              } rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Note Section */}
          <div
            className={`mt-6 pt-6 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <p
              className={`text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              } text-center`}
            >
              Admin access only. Contact administrator for credentials.<br />
              <span className="font-semibold">Username:</span> admin<br />
              <span className="font-semibold">Password:</span> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
