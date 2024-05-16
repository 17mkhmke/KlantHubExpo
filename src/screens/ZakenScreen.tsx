// ZakenScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardGrid from '../components/(services)/Zaken/ZakenCard';
import ZakenForm from '../components/(services)/Zaken/ZakenForm';

const ZakenScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
     <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />

      <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Zaken</Text>
      </TouchableOpacity>
      <CardGrid />
      {showForm && <ZakenForm onSubmit={handleSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: -1,
  },
  addButton: {
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
  },
});

export default ZakenScreen;
