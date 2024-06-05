import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const Card = ({ data, onPress, isExpanded }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={[styles.card, isExpanded && styles.expandedCard]}>
        <View style={styles.cardHeader}>
          <Image source={require('./../../../assets/2. Icons/Iris.svg')} style={styles.avatar} />
          <View>
            <Text style={styles.title}>{data.onderwerp}</Text>
            <View style={styles.infoRow}>
             <Image source={require('./../../../assets/2. Icons/Verzoek Gradient.png')} style={styles.icon} />
              <Text style={styles.infoText}>{data.zaaknummer}</Text>
              <Text style={styles.pr}>^</Text>
              <Text style={styles.infoText}>{data.prioriteit}</Text>
              <Image source={require('./../../../assets/2. Icons/Date Grey.png')} style={styles.icon} />
              <Text style={styles.infoText}>{data.gemaaktOp}</Text>
            </View>
          </View>
        </View>
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text>Licentie: {data.licentie}</Text>
            <Text>Fibo: {data.fibo}</Text>
            <Text>In de wacht: {data.inDeWacht}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const CardGrid = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const generateDummyData = () => {
    const zaaknummers = Array.from({ length: 16 }, (_, index) => `DB-${index + 10000}-R1W${index % 3}`);
    const types = ['Type A', 'Type B', 'Type C'];
    const gemaaktOp = '2022-05-01';
    const licenties = ['databalk', 'vasgoetable', 'inspecting', 'woonmacth', 'iris'];
    const fibo = Array.from({ length: 16 }, (_, index) => Math.floor(Math.random() * 13) + 1);
    const inDeWacht = ['Yes', 'No', 'Maybe'];
    const melders = ['John Doe', 'Jane Smith', 'David Brown', 'Emma Johnson'];
    const onderwerp = 'Test elastic pool zit vol';
    return zaaknummers.map((zaaknummer, index) => ({
      zaaknummer,
      type: types[index % 3],
      gemaaktOp,
      licentie: licenties[Math.floor(Math.random() * licenties.length)],
      prioriteit: 'Normal',
      fibo: fibo[index],
      inDeWacht: inDeWacht[index % 3],
      melder: melders[Math.floor(Math.random() * melders.length)],
      onderwerp,
    }));
  };

  const handleCardPress = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const dummyData = generateDummyData();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {dummyData.map((data, index) => (
          <Card
            key={index}
            data={data}
            onPress={() => handleCardPress(index)}
            isExpanded={expandedCard === index}
          />
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
  expandedCard: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
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
  pr: {
    color: "yellow",
    fontSize:16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  infoText: {
    marginRight: 10,
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 10,
  },
});

export default CardGrid;
