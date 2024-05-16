import React from 'react';
import Navigation from './components/Navigation';
import SplashScreen from './screens/SplashScreen';

const App: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;