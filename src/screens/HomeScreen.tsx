import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AfsprakenCards from '../components/Afspraken/AfsprakenCard';
import AfsprakenFilter from '../components/Afspraken/AfsprakenFilter';

const searchIcon = require('./../../assets/2. Icons/Search White.png');

const ZakenScreen = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />
      <View style={styles.topContainer}>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.iconContainer}>
              <Image source={searchIcon} style={styles.headerIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <AfsprakenCards />
      {showFilter && <AfsprakenFilter onClose={() => setShowFilter(false)} />}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingTop: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 10,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default ZakenScreen;
