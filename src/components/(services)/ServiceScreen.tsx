import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import ZakenScreen from '../../screens/ZakenScreen';
import PlatformScreen from '../../screens/PlatformScreen';

const ServiceScreen = () => {
  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Service</Text>
        <Image source={require('./../../../assets/Service.png')} style={styles.ServiceImage} />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 65,
  },
  ServiceImage: {
    width: 300,
    height: 300,
    marginBottom: 240,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});
export default ServiceScreen;