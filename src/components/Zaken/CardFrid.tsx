import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Card from './ZakenCard';
import { Incident } from '../../core/utils/interfaces';

interface CardGridProps {
  data: Incident[];
}

const CardGrid: React.FC<CardGridProps> = ({ data }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardPress = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No data available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <Card
            key={item.zaaknummer}
            data={item}
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
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CardGrid;
