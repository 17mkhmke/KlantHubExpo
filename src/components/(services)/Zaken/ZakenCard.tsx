import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

const Card = ({ data, onPress, isExpanded }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={[styles.card, isExpanded && styles.expandedCard]}>
        <Text style={styles.title}>Zaaknummer: {data.zaaknummer}</Text>
        {isExpanded && (
          <>
            <Text>Type: {data.type}</Text>
            <Text>Gemaakt op: {data.gemaaktOp}</Text>
            <Text>Licentie: {data.licentie}</Text>
            <Text>Prioriteit: {data.prioriteit}</Text>
            <Text>Fibo: {data.fibo}</Text>
            <Text>In de wacht: {data.inDeWacht}</Text>
            <Text>Melder: {data.melder}</Text>
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
    const gemaaktOp = '2022-05-01'; // Placeholder date
    const licenties = ['databalk', 'vasgoetable', 'inspecting', 'woonmacth', 'iris'];
    const fibo = Array.from({ length: 16 }, (_, index) => Math.floor(Math.random() * 13) + 1);
    const inDeWacht = ['Yes', 'No', 'Maybe'];
    const melders = ['John Doe', 'Jane Smith', 'David Brown', 'Emma Johnson']; // Placeholder names
    const onderwerp = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
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
        {dummyData.map((data, index) => (
          <Card
            key={index}
            data={data}
            onPress={() => handleCardPress(index)}
            isExpanded={expandedCard === index}
          />
        ))}
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
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expandedCard: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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