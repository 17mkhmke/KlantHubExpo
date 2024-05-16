import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Welkom bij de KlantHub</Text>
        <Image source={require('./../../assets/KlantHub.png')} style={styles.HomeImage} />
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
    fontSize: 54,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 120,
  },
  HomeImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
export default HomeScreen;