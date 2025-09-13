import React, { useState, useEffect } from 'react';
import { ErrorDialog } from './ErrorDialog';
import { Terminal } from './Terminal';

export const ErrorSystem: React.FC = () => {
  const [visitCount, setVisitCount] = useState(1);
  const [showTerminal, setShowTerminal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    browser: 'Unknown',
    screenRes: 'Unknown',
    location: 'Unknown',
    sessionId: '',
  });

  useEffect(() => {
    // Track visits in localStorage
    const visits = localStorage.getItem('notalone_visits');
    const newVisitCount = visits ? parseInt(visits) + 1 : 1;
    setVisitCount(newVisitCount);
    localStorage.setItem('notalone_visits', newVisitCount.toString());

    // Collect "user info" (harmless browser info)
    const generateSessionId = () => Math.random().toString(36).substr(2, 8).toUpperCase();
    
    setUserInfo({
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
               navigator.userAgent.includes('Firefox') ? 'Firefox' : 
               navigator.userAgent.includes('Safari') ? 'Safari' : 'Unknown',
      screenRes: `${screen.width}x${screen.height}`,
      location: 'Local Area', // Keeping it vague for safety
      sessionId: generateSessionId(),
    });
  }, []);

  const handleFixError = () => {
    setShowTerminal(true);
  };

  const handleRetry = () => {
    // Increment visit count and refresh the error
    const newVisitCount = visitCount + 1;
    setVisitCount(newVisitCount);
    localStorage.setItem('notalone_visits', newVisitCount.toString());
  };

  if (showTerminal) {
    return <Terminal userInfo={userInfo} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ErrorDialog 
        visitCount={visitCount}
        userInfo={userInfo}
        onRetry={handleRetry}
        onFixError={handleFixError}
      />
    </div>
  );
};