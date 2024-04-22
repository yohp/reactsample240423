import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import MyForm from './components/MyForm';
import LoadingAnimation from './components/LoadingAnimation';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  const handleLogin = (loggedIn: boolean, enteredUsername: string) => {
    setIsLoggedIn(loggedIn);
    setUsername(enteredUsername);
    setIsLoading(false);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingAnimation onComplete={handleLoadingComplete} />
      ) : isLoggedIn ? (
        <MyForm username={username} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;