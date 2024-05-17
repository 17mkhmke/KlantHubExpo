import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardGrid from '../components/(services)/Zaken/ZakenCard';
import ZakenForm from '../components/(services)/Zaken/ZakenForm';
import FilterComponent from '../components/(services)/Zaken/Filte';
import { Badge, Icon } from 'react-native-elements'

const filterIcon = require('./../../assets/2. Icons/Filter White.png');
const addZaak = require('./../../assets/2. Icons/Add New White.png');
const briefcaseIcon = require('./../../assets/2. Icons/Zaken Blue.png');

const ZakenScreen = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <View style={styles.badgeContainer}>
            <Image source={briefcaseIcon} style={styles.briefcaseIcon} />
            <Text style={styles.badgeText}>12 zaken</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={isSwitchOn}
              onValueChange={setIsSwitchOn}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={styles.switchLabel}>{isSwitchOn ? 'closeZaak' : 'openZaak'}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowForm(true)} style={styles.headerButton}>
            <Image source={addZaak} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowFilter(!showFilter)} style={styles.headerButton}>
            <Image source={filterIcon} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, showFilter, isSwitchOn]);


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
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
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
    marginRight: 10,
  },
  switchLabel: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  headerButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerButtonText: {
    width: 24,
    fontSize: 30,
    height: 24,
    tintColor: 'white',
  },
  filterIcon: {
    width: 24,
    marginTop: 10,
    height: 24,
    tintColor: 'white',
  },
});

export default ZakenScreen;
