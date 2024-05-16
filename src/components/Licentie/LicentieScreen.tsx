import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LicentieScreen = () => {
  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Licentie</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default LicentieScreen;