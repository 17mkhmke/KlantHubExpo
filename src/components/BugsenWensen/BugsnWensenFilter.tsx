import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Animated, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const FilterComponent = ({ applyFilter, closeFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBugs, setShowBugs] = useState(false);
  const [showWensen, setShowWensen] = useState(false);
  const slideAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleApplyFilter = () => {
    const filterData = {
      isOpen,
      showBugs,
      showWensen,
    };
    applyFilter(filterData);
    handleCloseFilter();
  };

  const handleCloseFilter = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => closeFilter());
  };

  return (
    <Animated.View style={[styles.filterContainer, { transform: [{ translateX: slideAnim }] }]}>
      <LinearGradient colors={['rgba(29, 88, 151, 0.6)', 'rgba(29, 88, 151, 0.6)']} style={styles.background}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseFilter}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Filter</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bug/Wensen</Text>
            <Switch
              value={isOpen}
              onValueChange={(value) => setIsOpen(value)}
              thumbColor={isOpen ? '#00A7DB' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            <Text style={styles.switchText}>{isOpen ? 'Open' : 'Closed'}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type</Text>
            <CheckBox
              title="Bugs"
              checked={showBugs}
              onPress={() => setShowBugs(!showBugs)}
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
              checkedColor="#00A7DB"
            />
            <CheckBox
              title="Wensen"
              checked={showWensen}
              onPress={() => setShowWensen(!showWensen)}
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
              checkedColor="#00A7DB"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleApplyFilter}>
            <Text style={styles.submitButtonText}>Indienen</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '80%',
    zIndex: 10,
  },
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 80,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  switchText: {
    color: 'white',
    marginTop: 10,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
  },
  checkBoxText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#00A7DB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterComponent;
