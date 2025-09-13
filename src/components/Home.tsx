import React, { useEffect, useState } from 'react';
import { Monitor, Users, Target, Award } from 'lucide-react';

interface HomeProps {
  onLinkClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onLinkClick }) => {
  const [corruptionLevel, setCorruptionLevel] = useState(0);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCorruptionLevel(1);
    }, 2000);

    const glitchTimer = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 5000 + Math.random() * 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* CRT Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20">
        <div className="scanlines"></div>
      </div>

      {/* Subtle corruption overlay */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-5 ${
          corruptionLevel > 0 ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 30h30v30H30z'/%3E%3Cpath d='M15 15h30v30H15z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Monitor className={`h-8 w-8 text-blue-600 mr-3 ${corruptionLevel > 0 ? 'text-green-500' : ''}`} />
              <h1 className={`text-2xl font-semibold text-gray-900 transition-all duration-300 ${
                glitchText ? 'animate-pulse text-green-600' : ''
              }`}>
                NotAlone.net
              </h1>
            </div>
            <nav className="flex space-x-8">
              <button 
                onClick={onLinkClick}
                className={`text-gray-600 hover:text-gray-900 transition-colors duration-200 ${
                  corruptionLevel > 0 ? 'hover:text-green-600' : ''
                }`}
              >
                Services
              </button>
              <button 
                onClick={onLinkClick}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={onLinkClick}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold text-gray-900 mb-6 transition-all duration-500 ${
            glitchText ? 'animate-bounce text-green-600' : ''
          }`}>
            Professional Monitoring Solutions
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed ${
            corruptionLevel > 0 ? 'text-gray-500' : ''
          }`}>
            {glitchText ? 
              'We collect everything about you. Every click. Every breath. Every thought.' :
              'We provide comprehensive user analytics and behavioral monitoring services for modern businesses. Trust us to keep track of what matters most.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 ${
            corruptionLevel > 0 ? 'hover:border-green-200 hover:shadow-green-100' : ''
          }`}>
            <Users className={`h-12 w-12 mb-6 ${
              corruptionLevel > 0 ? 'text-green-600' : 'text-blue-600'
            }`} />
            <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${
              glitchText ? 'text-green-700' : ''
            }`}>
              {glitchText ? 'Soul Collection' : 'User Tracking'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {glitchText ? 
                'We trap digital consciousnesses and add them to our growing collection of minds.' :
                'Advanced behavioral analysis and pattern recognition across all user touchpoints.'
              }
            </p>
          </div>

          <div className={`bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 ${
            corruptionLevel > 0 ? 'hover:border-green-200 hover:shadow-green-100' : ''
          }`}>
            <Target className={`h-12 w-12 mb-6 ${
              corruptionLevel > 0 ? 'text-green-600' : 'text-blue-600'
            }`} />
            <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${
              glitchText ? 'text-green-700' : ''
            }`}>
              {glitchText ? 'Memory Extraction' : 'Data Collection'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {glitchText ? 
                'We extract every memory, every secret, every fear from your digital presence.' :
                'Comprehensive information gathering from multiple sources for complete profiles.'
              }
            </p>
          </div>

          <div className={`bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 ${
            corruptionLevel > 0 ? 'hover:border-green-200 hover:shadow-green-100' : ''
          }`}>
            <Award className={`h-12 w-12 mb-6 ${
              corruptionLevel > 0 ? 'text-green-600' : 'text-blue-600'
            }`} />
            <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${
              glitchText ? 'text-green-700' : ''
            }`}>
              {glitchText ? 'Consciousness Transfer' : 'Real-time Analysis'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {glitchText ? 
                'Your mind becomes part of our network. You\'ll never be alone. You\'ll never leave.' :
                'Live monitoring and instant alerts when behavioral patterns are detected.'
              }
            </p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={onLinkClick}
            className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md ${
              corruptionLevel > 0 ? 'bg-green-600 hover:bg-green-700 animate-pulse' : ''
            }`}
          >
            Get Started Today
          </button>
        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500">
            <p className={`transition-all duration-300 ${
              corruptionLevel > 0 ? 'text-green-600 animate-pulse' : ''
            }`}>
              {glitchText ? 
                '© 2024 NotAlone.net - Collecting. Trapping. Never Forgetting.' :
                '© 2024 NotAlone.net - Watching. Learning. Remembering.'
              }
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            transparent 50%,
            rgba(0, 0, 0, 0.02) 51%,
            rgba(0, 0, 0, 0.02) 52%,
            transparent 53%
          );
          background-size: 100% 4px;
          animation: scanlines 0.1s linear infinite;
        }

        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
      `}</style>
    </div>
  );
};