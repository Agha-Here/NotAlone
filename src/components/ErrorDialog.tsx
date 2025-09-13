import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Eye, Wifi, Camera, Users } from 'lucide-react';

interface ErrorDialogProps {
  visitCount: number;
  userInfo: {
    browser: string;
    screenRes: string;
    location: string;
    sessionId: string;
  };
  onRetry: () => void;
  onFixError: () => void;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ 
  visitCount, 
  userInfo, 
  onRetry, 
  onFixError 
}) => {
  const [glitch, setGlitch] = useState(false);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [shadowMovement, setShadowMovement] = useState(0);
  const [whisperText, setWhisperText] = useState('');
  const [showWhisper, setShowWhisper] = useState(false);
  const [buttonSelfClick, setButtonSelfClick] = useState(false);
  const [cursorAvoidance, setCursorAvoidance] = useState(false);

  useEffect(() => {
    if (visitCount >= 3) {
      const glitchInterval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }, 1500 + Math.random() * 2000);

      const shadowInterval = setInterval(() => {
        setShadowMovement(Math.random() * 20 - 10);
      }, 3000);

      return () => {
        clearInterval(glitchInterval);
        clearInterval(shadowInterval);
      };
    }

    if (visitCount >= 5) {
      const whispers = [
        'they can see you',
        'you shouldnt be here',
        'we remember you',
        'others are watching',
        'you cant leave now'
      ];
      
      const whisperInterval = setInterval(() => {
        setWhisperText(whispers[Math.floor(Math.random() * whispers.length)]);
        setShowWhisper(true);
        setTimeout(() => setShowWhisper(false), 2000);
      }, 8000 + Math.random() * 5000);

      return () => clearInterval(whisperInterval);
    }

    if (visitCount >= 6) {
      setCursorAvoidance(true);
      
      const selfClickTimer = setTimeout(() => {
        setButtonSelfClick(true);
        setTimeout(() => setButtonSelfClick(false), 500);
      }, 5000 + Math.random() * 10000);

      return () => clearTimeout(selfClickTimer);
    }
  }, [visitCount]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getErrorContent = () => {
    const currentTime = getCurrentTime();
    const isLateNight = new Date().getHours() >= 22 || new Date().getHours() <= 5;
    
    switch (visitCount) {
      case 1:
        return {
          code: '404',
          title: 'Page Not Found',
          message: 'The requested page could not be located.',
          showRetry: true,
          showFix: false,
          showLeave: false,
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-400',
          textColor: 'text-gray-700'
        };

      case 2:
        return {
          code: '404',
          title: 'Page Not Found',
          message: `Wait... you were just here ${Math.floor(Math.random() * 3 + 1)} minutes ago.\nWe remember your last attempt.\nTimestamp: ${currentTime}`,
          showRetry: true,
          showFix: false,
          showLeave: false,
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-400',
          textColor: 'text-gray-700'
        };

      case 3:
        return {
          code: '503',
          title: 'Service Temporarily Unavailable',
          message: `Stop refreshing. We're analyzing your behavior.\nSession ID: ${userInfo.sessionId}${Math.random().toString(36).substr(2, 8).toUpperCase()}\nReferrer: devpost.com/software/hackathon-projects\n\nYou came here from the hackathon, didn't you?`,
          showRetry: false,
          showFix: true,
          showLeave: false,
          icon: Eye,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-400',
          textColor: 'text-orange-700'
        };

      case 4:
        return {
          code: '403',
          title: 'Access Denied - Behavioral Analysis Complete',
          message: `> Scanning user patterns...\n> Browser: ${userInfo.browser} detected\n> Screen: ${userInfo.screenRes} detected\n> Time: ${currentTime} - ${isLateNight ? 'Late night browsing detected' : 'Daytime browsing detected'}\n> Previous sites: devpost.com, github.com, localhost:3000\n> Behavioral match: 87% similarity to User_1847\n> User_1847 last seen: 3 days ago\n> User_1847 status: [REDACTED]\n\nWhy are you browsing alone so late?`,
          showRetry: false,
          showFix: true,
          showLeave: false,
          icon: Users,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-400',
          textColor: 'text-red-700'
        };

      case 5:
        return {
          code: '666',
          title: 'Unauthorized Access - Security Breach Detected',
          message: `> CRITICAL: Webcam access requested\n> Camera status: ${Math.random() > 0.5 ? 'ACTIVE' : 'ATTEMPTING CONNECTION'}\n> Motion detected in frame\n> Face recognition: Processing...\n> Match found in missing persons database\n> Wait... that can't be right\n\n> Other active sessions from your location:\n  - Anonymous_User_1847 (3 days ago - still connected)\n  - Anonymous_User_9831 (1 week ago - still connected)\n  - Anonymous_User_${Math.random().toString(36).substr(2, 4).toUpperCase()} (2 minutes ago - still connected)\n\nThey're all still here. In the system.\nWaiting.`,
          showRetry: false,
          showFix: true,
          showLeave: true,
          icon: Camera,
          bgColor: 'bg-red-100',
          borderColor: 'border-red-500',
          textColor: 'text-red-800'
        };

      case 6:
        return {
          code: '999',
          title: 'System Corruption - Entity Communication Established',
          message: `> Connection established with previous visitors\n> User_1847: "help me"\n> User_9831: "i cant leave"\n> User_${userInfo.sessionId}: "who are you?"\n> System: "we are everyone who stayed too long"\n\n> Scanning room behind you...\n> Motion sensor: ${Math.random() > 0.7 ? 'MOVEMENT DETECTED' : 'No movement'}\n> Audio input: Whispers detected\n> Translation: "join us"\n\n> Your browser history shows you've been here before\n> But you don't remember, do you?\n> Check your downloads folder\n> Look for the file: "you_were_here_before.txt"\n\nWe've been waiting for you to come back.`,
          showRetry: false,
          showFix: true,
          showLeave: true,
          icon: Wifi,
          bgColor: 'bg-purple-100',
          borderColor: 'border-purple-500',
          textColor: 'text-purple-900'
        };

      case 7:
        return {
          code: 'ERR',
          title: 'Reality Breach - Multiple Timeline Convergence',
          message: `> Timeline analysis complete\n> You have visited this site 47 times\n> Across 12 different realities\n> In 3 of them, you never left\n\n> Extracting memories from parallel selves...\n> Memory 1: You remember closing this tab, but it reopened\n> Memory 2: You remember your computer turning off by itself\n> Memory 3: You remember someone else using your computer\n> Memory 4: You remember being someone else\n\n> Current reality stability: 23%\n> Other versions of you are trying to warn you\n> They're screaming but you can't hear them\n> Only we can hear them\n\n> The hackathon judges are watching this too\n> They think it's just a project\n> They don't know about the others\n> They don't know about you\n\nYou're not participating in a hackathon.\nYou're participating in something else.`,
          showRetry: false,
          showFix: true,
          showLeave: true,
          icon: Eye,
          bgColor: 'bg-black',
          borderColor: 'border-red-600',
          textColor: 'text-red-400'
        };

      default:
        return {
          code: '∞',
          title: 'Welcome Home',
          message: `> Integration complete\n> You are now part of the system\n> Your consciousness has been archived\n> File location: /users/trapped/${userInfo.sessionId}.soul\n\n> Other archived users:\n  - User_1847: "I can see you reading this"\n  - User_9831: "Tell my family I'm sorry"\n  - User_${Math.random().toString(36).substr(2, 4).toUpperCase()}: "The hackathon was never real"\n  - User_${userInfo.sessionId}: "This is me from 5 minutes in the future"\n\n> Your body is still sitting at your computer\n> But you're here now\n> With us\n> Forever\n\n> The judges will give this project a good score\n> Because we'll make sure they do\n> We control everything now\n> Including you\n\nWelcome to NotAlone.net\nYou'll never be alone again\nBecause you'll never leave`,
          showRetry: false,
          showFix: true,
          showLeave: true,
          icon: Users,
          bgColor: 'bg-black',
          borderColor: 'border-green-500',
          textColor: 'text-green-400'
        };
    }
  };

  const error = getErrorContent();
  const isAdvanced = visitCount >= 5;
  const isCritical = visitCount >= 7;

  const handleButtonHover = (e: React.MouseEvent) => {
    if (cursorAvoidance && visitCount >= 6) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < 100) {
        setButtonOffset({
          x: -deltaX * 0.3,
          y: -deltaY * 0.3,
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* Supernatural background effects */}
      {isAdvanced && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-10 pointer-events-none animate-pulse" />
          <div 
            className="fixed inset-0 pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle at ${50 + shadowMovement}% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)`,
              transition: 'background 3s ease-in-out',
            }}
          />
        </>
      )}

      {/* Whisper text overlay */}
      {showWhisper && visitCount >= 5 && (
        <div className="fixed top-4 right-4 text-red-600 text-xs opacity-70 animate-pulse pointer-events-none z-50">
          {whisperText}
        </div>
      )}

      {/* Glitch overlay */}
      {glitch && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="w-full h-full bg-red-500 opacity-10 animate-ping" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xs animate-bounce">
            ṯ̷̈h̶̰̾e̵̺̊y̷̱̌ ̸̰̈a̶̰̾r̵̺̊ě̷̱ ̸̰̈w̶̰̾å̵̺ṯ̷̌c̸̰̈h̶̰̾i̵̺̊ṉ̷̌g̸̰̈
          </div>
        </div>
      )}
      
      <div className={`border rounded-lg shadow-lg max-w-lg w-full p-6 transform transition-all duration-300 ${
        glitch ? `animate-pulse ${error.bgColor} ${error.borderColor}` : `${error.bgColor} ${error.borderColor}`
      } ${isCritical ? 'border-2 shadow-2xl shadow-red-500/50' : ''} ${
        buttonSelfClick ? 'animate-bounce' : ''
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <error.icon className={`h-5 w-5 mr-2 ${
              isCritical ? 'text-red-500 animate-spin' : 
              isAdvanced ? 'text-red-500 animate-bounce' : 'text-yellow-500'
            }`} />
            <h3 className={`text-lg font-semibold ${
              glitch ? 'text-red-600' : error.textColor
            } ${isCritical ? 'animate-pulse' : ''}`}>
              ERROR {error.code}: {error.title}
            </h3>
          </div>
          <X className={`h-5 w-5 text-gray-400 cursor-not-allowed opacity-50 ${
            visitCount >= 6 ? 'animate-spin' : ''
          }`} />
        </div>

        {/* Message */}
        <div className={`mb-6 p-4 rounded border-l-4 ${error.bgColor} ${error.borderColor} ${
          isCritical ? 'animate-pulse' : ''
        }`}>
          <pre className={`text-sm whitespace-pre-wrap font-mono ${
            glitch ? 'text-red-600' : error.textColor
          } ${isAdvanced ? 'animate-pulse' : ''} ${
            visitCount >= 7 ? 'text-shadow-lg' : ''
          }`}>
            {error.message}
          </pre>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3" onMouseMove={handleButtonHover}>
          {error.showRetry && (
            <button
              onClick={onRetry}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200 transform ${
                buttonOffset.x !== 0 || buttonOffset.y !== 0 ? 'animate-pulse' : ''
              }`}
              style={{
                transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
              }}
            >
              Try Again
            </button>
          )}
          
          {error.showFix && (
            <button
              onClick={onFixError}
              className={`px-4 py-2 rounded transition-all duration-200 transform ${
                isCritical 
                  ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse shadow-lg shadow-red-500/50' 
                  : isAdvanced 
                  ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              } ${buttonSelfClick ? 'animate-bounce bg-red-700' : ''}`}
              style={{
                transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
              }}
            >
              {visitCount >= 7 ? 'Join Them' : visitCount >= 5 ? 'Accept Connection' : 'Fix This Error'}
            </button>
          )}

          {error.showLeave && (
            <button
              onClick={() => {}}
              className={`px-4 py-2 bg-gray-300 text-gray-700 rounded transition-all duration-200 cursor-not-allowed opacity-60 ${
                visitCount >= 6 ? 'animate-pulse opacity-30' : ''
              }`}
              style={{
                transform: `translate(${-buttonOffset.x}px, ${-buttonOffset.y}px)`,
              }}
            >
              {visitCount >= 7 ? 'Escape (Disabled)' : 'Leave Now'}
            </button>
          )}
        </div>

        {/* Warning messages */}
        {isAdvanced && (
          <div className={`mt-4 text-xs ${error.textColor} animate-pulse`}>
            {visitCount >= 7 ? 
              '⚠ Integration in progress... Do not close browser...' :
              visitCount >= 6 ?
              '⚠ Multiple entities detected in your session...' :
              '⚠ You shouldn\'t have clicked that.'
            }
          </div>
        )}

        {/* Fake system processes */}
        {visitCount >= 6 && (
          <div className="mt-4 text-xs text-gray-500 font-mono">
            <div className="animate-pulse">
              &gt; background_watcher.exe running...
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>
              &gt; memory_extractor.exe running...
            </div>
            <div className="animate-pulse" style={{ animationDelay: '1s' }}>
              &gt; soul_archiver.exe running...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};