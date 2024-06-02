import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import Navigation from './src/components/Navigation';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: '',
    position: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  const handleLoginSuccess = (userDetails: { avatar: string; name: string; email: string; position: string }) => {
    setIsAuthenticated(true);
    setUser(userDetails);
  };

  if (!isReady) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <NavigationContainer>
      <Navigation user={user} />
    </NavigationContainer>
  );
};

export default App;
