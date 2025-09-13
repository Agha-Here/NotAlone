import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { ErrorSystem } from './components/ErrorSystem';

function App() {
  const [stage, setStage] = useState<'landing' | 'error'>('landing');

  const handleLinkClick = () => {
    setStage('error');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {stage === 'landing' && <Home onLinkClick={handleLinkClick} />}
      {stage === 'error' && <ErrorSystem />}
    </div>
  );
}

export default App;