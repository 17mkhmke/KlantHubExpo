import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.header}>
        <Image source={require('./../../../assets/DataBalk Logo White.png')} style={styles.logo} />
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Welkom bij de KlanHub mobiele applicatie</Text>
        <Image source={require('./../../../assets/1. Illustrations/KlantHub.png')} style={styles.headerImage} />
      </View>
      <Text style={styles.loginText}>
        Log in met uw Microsoft account
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Image source={require('./../../../assets/2. Icons/Omwisselen copy.png')} style={styles.userIcon} />
        <Text style={styles.loginButtonText}>Inloggen</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: -25,
    width: 700,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#00A7DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    height: 81,
  },
  logo: {
    width: 140,
    height: 34,
    marginRight: 32,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -25,
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  microsoftLogo: {
    width: 1,
    height: 1,
    marginHorizontal: 5,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  userIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loginButtonText: {
    color: '#707070',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 75,
  },
});

export default LoginScreen;
