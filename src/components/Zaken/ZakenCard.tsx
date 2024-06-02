import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

const Card = ({ data, onPress, isExpanded }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={[styles.card, isExpanded && styles.expandedCard]}>
        <Text style={styles.title}>{data.onderwerp}</Text>
        <Text>{data.zaaknummer}</Text>
        <Text>{data.gemaaktOp}</Text>
        {isExpanded && (
          <>
            <Text>Licentie: {data.licentie}</Text>
            <Text>Prioriteit: {data.prioriteit}</Text>
            <Text>Fibo: {data.fibo}</Text>
            <Text>In de wacht: {data.inDeWacht}</Text>
            <Text>Onderwerp: {data.onderwerp}</Text>
          </>
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
    const onderwerp = 'Lorem ipsum dolor sit amet';
    return zaaknummers.map((zaaknummer, index) => ({
      zaaknummer,
      type: types[index % 3],
      gemaaktOp,
      licentie: licenties[Math.floor(Math.random() * licenties.length)],
      prioriteit: index + 1,
      fibo: fibo[index],
      inDeWacht: inDeWacht[index % 3],
      melder: melders[Math.floor(Math.random() * melders.length)],
      onderwerp,
    }));
  };

  const handleCardPress = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleMinimize = () => {
    setExpandedCard(null);
  };

  const dummyData = generateDummyData();

  return (
    <TouchableWithoutFeedback onPress={handleMinimize}>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    height: 120,
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
    height: 'auto',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CardGrid;
