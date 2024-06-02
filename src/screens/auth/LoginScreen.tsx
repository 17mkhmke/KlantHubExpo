import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { authenticate } from '../../../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (userDetails: { avatar: string; name: string; email: string; position: string }) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      const authResult = await authenticate();
      if (authResult) {
        console.log('Authentication successful:', authResult);

        // Mock user details, replace with actual data from authResult if available
        const userDetails = {
          avatar: 'https://example.com/path/to/avatar.jpg',
          name: 'Mkhuseli Mkeyiya',
          email: 'mkhuseli@databalk.nu',
          position: 'Ontwikkler',
        };

        onLoginSuccess(userDetails);
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Microsoft" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
