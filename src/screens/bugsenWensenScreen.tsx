import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BugsnWensencards from './../components/BugsenWensen/BugsnWensenCards';
import BugsnWensenFilter from '../components/BugsenWensen/BugsnWensenFilter';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
const filterIcon = require('./../../assets/2. Icons/Filter White.png');
const searchIcon = require('./../../assets/2. Icons/Search White.png');

const BugsEnWensen = () => {
    const [showFilter, setShowFilter] = useState(false);
  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
            <View style={styles.topContainer}>
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
      <ScrollView contentContainerStyle={styles.container}>
        <BugsnWensencards />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 2, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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

export default BugsEnWensen;
