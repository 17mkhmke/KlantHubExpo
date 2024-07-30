import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import Navigation from './src/components/Navigation';

interface UserDetails {
  photoUrl: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  graphPhotoUrl?: string;
  graphDisplayName?: string;
  customerId?: string;
  crmUserId?: string;
  licentie1?: string;
  licentie2?: string | null;
  licenties?: string[];
  teamsChannelUrl?: string | null;
  testMonitorUrl?: string | null;
  plannerUrl?: string | null;
  sharePointUrl?: string | null;
  klantClip?: string | null;
}

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserDetails>({
    photoUrl: '',
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  const handleLoginSuccess = (userDetails: UserDetails) => {
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
