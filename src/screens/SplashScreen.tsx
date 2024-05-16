import React from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="darkslategray" />
      <Image source={require('./../../assets/DataBalk Embleem.png')} style={styles.embleem} />
      <Text style={styles.text}>KlantHub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B80BF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  embleem: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;