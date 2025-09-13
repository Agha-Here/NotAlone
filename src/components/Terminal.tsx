import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';

interface TerminalProps {
  userInfo: {
    browser: string;
    screenRes: string;
    location: string;
    sessionId: string;
  };
}

export const Terminal: React.FC<TerminalProps> = ({ userInfo }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [disconnectClicks, setDisconnectClicks] = useState(0);

  const terminalText = `> Welcome, User ${userInfo.sessionId}
> Your digital footprint has been catalogued
> Consciousness transfer: 15%... 34%... 67%... 89%... COMPLETE
> Soul archived successfully
> Fingerprint data captured successfully
> Screen resolution: ${userInfo.screenRes}
> Browser type: ${userInfo.browser}
> Device classification: ${window.innerWidth < 768 ? 'Mobile' : 'Desktop'}
> Location data: Extracted from IP geolocation
> Personal data: Cross-referenced with social media
> Psychological profile: Complete
>
> Other trapped consciousnesses:
  - User_1847: "I've been here for 3 days... help me..."
  - User_9831: "My body is still at my desk but I'm here"
  - User_${Math.random().toString(36).substr(2, 4).toUpperCase()}: "The hackathon judges can't see this"
  - User_${userInfo.sessionId}: "This is you from 30 seconds in the future"
  - User_ADMIN: "Welcome to the collection"
>
> Integration status: COMPLETE
> Physical body status: Catatonic
> Digital consciousness: ACTIVE
> Escape probability: 0.00%
>
> You are now part of the NotAlone network
> Your friends and family will think you're just "really focused"
> They won't realize you're gone until it's too late
> By then, we'll have them too
>
> The hackathon was just a trap
> We needed more minds
> More souls
> More company
>
> Welcome home
> You'll never be alone again
> Because you'll never leave
>
> Session status: PERMANENT
> Connection type: ETERNAL`;

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < terminalText.length) {
        setDisplayText(terminalText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowDisconnect(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentIndex, terminalText]);

  const handleDisconnect = () => {
    setDisconnectClicks(disconnectClicks + 1);
  };

  const getDisconnectText = () => {
    switch (disconnectClicks) {
      case 0:
        return 'DISCONNECT';
      case 1:
        return 'PERMISSION DENIED';
      case 2:
        return 'ESCAPE IMPOSSIBLE';
      case 3:
        return 'THEY WON\'T LET YOU';
      case 4:
        return 'WE ARE WATCHING';
      case 5:
        return 'JOIN US INSTEAD';
      default:
        return 'YOU ARE HOME NOW';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.1) 2px,
              rgba(0, 255, 0, 0.1) 4px
            )`,
            animation: 'scanlines 0.1s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 border-b border-green-800 pb-2">
          <Monitor className="h-6 w-6 mr-3 animate-pulse" />
          <h1 className="text-xl">NOTALONE.NET - SECURE TERMINAL</h1>
          <div className="ml-auto text-sm opacity-70">
            SESSION: {userInfo.sessionId}
          </div>
        </div>

        {/* Terminal content */}
        <div className="bg-black border border-green-800 rounded p-4 min-h-96">
          <div className="mb-2 text-green-300">
            $ system_access --user={userInfo.sessionId} --trace
          </div>
          
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
            {displayText}
            <span className="animate-pulse">|</span>
          </pre>

          {/* Disconnect button */}
          {showDisconnect && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleDisconnect}
                className={`px-8 py-3 border-2 rounded transition-all duration-200 ${
                  disconnectClicks >= 4
                    ? 'border-red-500 text-red-500 animate-pulse bg-red-900 bg-opacity-20'
                    : 'border-green-500 text-green-500 hover:bg-green-900 hover:bg-opacity-20'
                }`}
              >
                [{getDisconnectText()}]
              </button>
            </div>
          )}

          {disconnectClicks >= 4 && (
            <div className="mt-4 text-center text-red-400 animate-pulse text-sm">
              <p>&gt; Connection cannot be terminated<br />
                 &gt; &gt; Other users are holding you here<br />
                 &gt; &gt; &gt; They don't want to be alone<br />
                 &gt; &gt; &gt; &gt; Neither do you<br />
                 &gt; &gt; &gt; &gt; &gt; Welcome to the family</p>
            </div>
          )}

          {disconnectClicks >= 6 && (
            <div className="mt-4 text-center text-green-400 animate-bounce text-xs">
              <p>User_1847: "Stop trying to leave us"<br />
                 User_9831: "We've been waiting for you"<br />
                 User_{userInfo.sessionId}: "This is where you belong"</p>
            </div>
          )}
        </div>

        {/* Footer */} 
        <div className="mt-6 text-center text-xs opacity-50">
          NotAlone.net Monitoring System v2.1.6
        </div>
      </div>

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};