import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardGrid from '../components/Zaken/ZakenCard';
import ZakenForm from '../components/Zaken/ZakenForm';
import FilterComponent from '../components/Zaken/Filte';

const addZaak = require('./../../assets/2. Icons/Add New White.png');
const searchIcon = require('./../../assets/2. Icons/Search White.png');
const filterIcon = require('./../../assets/2. Icons/Filter White.png');

const ZakenScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />
      <View style={styles.topContainer}>
      
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.headerButton}>
          <View style={styles.iconContainer}>
            <Image source={addZaak} style={styles.headerIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.headerButton}>
          <View style={styles.iconContainer}>
            <Image source={filterIcon} style={styles.headerIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <View style={styles.iconContainer}>
            <Image source={searchIcon} style={styles.headerIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <CardGrid />
      <ZakenForm visible={showForm} setVisible={setShowForm} onSubmit={handleSubmit} />
      {showFilter && <FilterComponent onClose={() => setShowFilter(false)} />}
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
  topContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
 
    paddingHorizontal: 5,
    paddingTop: 2, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  briefcaseIcon: {
    width: 24,
    height: 24,
  },
  badgeText: {
    marginLeft: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default ZakenScreen;
