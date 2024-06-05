import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const BugsnWensencard = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={require('./../../../assets/2. Icons/Iris.svg')} style={styles.avatar} />
        <View style={styles.cardInfo}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}># {data.id}</Text>
            <Text style={styles.infoText}>Versie: {data.version}</Text>
            <Text style={styles.infoText}>Sprint: {data.sprint}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const BugsnWensencards = () => {
  const generateDummyData = () => {
    return Array.from({ length: 16 }, (_, index) => ({
      id: index + 36414,
      title: 'IRIS CRM | New Client Secret Test',
      version: 'Wave 24.2',
      sprint: 'Wave 24.2',
    }));
  };

  const dummyData = generateDummyData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {dummyData.map((data, index) => (
          <BugsnWensencard key={index} data={data} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    marginRight: 3,
    fontSize: 14,
  },
});

export default BugsnWensencards;
