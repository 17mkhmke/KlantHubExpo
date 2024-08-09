import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardGrid from '../components/Zaken/CardFrid';
import ZakenForm from '../components/Zaken/ZakenForm';
import FilterComponent from '../components/Zaken/Filte';
import { invokeDataBalkRobot, dataBalkRobotEndpoints } from './../../services/dataBalkRobot';
import { Incident } from './../core/utils/interfaces';


const addZaak = require('./../../assets/2. Icons/Add New White.png');
const searchIcon = require('./../../assets/2. Icons/Search White.png');
const filterIcon = require('./../../assets/2. Icons/Filter White.png');

const accountId = 'fdabf763-eb00-ec11-94ef-000d3a493499';

const ZakenScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = `${dataBalkRobotEndpoints.getResolvedZaken}${accountId}`;

      console.log('Fetching data from endpoint:', endpoint);

      const response = await invokeDataBalkRobot<Incident[]>(endpoint, 'GET');


      if (!Array.isArray(response)) {
        throw new Error('Invalid response format: Response is not an array');
      }

      setIncidents(response);
      setLoading(false);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An unknown error occurred');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setShowForm(false);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background} />
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
      <CardGrid data={incidents} />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#009ACE',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ZakenScreen;