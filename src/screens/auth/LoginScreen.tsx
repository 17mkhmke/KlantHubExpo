import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { authenticateAllAPIs, fetchUserDetailsFromMicrosoftGraph, getToken } from '../../../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (userDetails: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const handleLogin = async () => {
    try {
      // Authenticate all APIs
      await authenticateAllAPIs();

      // Fetch user details using Microsoft Graph access token
      const msGraphAccessToken = await getToken('msGraph', 'User.Read openid profile offline_access', {
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      });
      
      const userDetails = await fetchUserDetailsFromMicrosoftGraph(msGraphAccessToken);

      onLoginSuccess(userDetails);
    } catch (error) {
      Alert.alert('Login error', 'Failed to authenticate. Please try again.');
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
    width: 850,
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
