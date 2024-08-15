import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Incident } from '../../core/utils/interfaces';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  data: Incident;
  onPress: () => void;
  isExpanded: boolean;
}


const Card: React.FC<CardProps> = ({ data }) => {
  const navigation = useNavigation();

  const licentieIcons: { [key: string]: ImageSourcePropType } = {
    'WOONMATCH': require('./../../../assets/Product Logo/Woonmatch.png'),
    'INSPECTIC': require('./../../../assets/Product Logo/Inspectic.jpg'),
    'IRIS CRM': require('./../../../assets/Product Logo/IRIS CRM.png'),
    'IRIS': require('./../../../assets/Product Logo/7. IRIS.png'),
    'IRIS CMS': require('./../../../assets/Product Logo/7. IRIS.png'),
  };

  const typeIcons: { [key: string]: ImageSourcePropType } = {
    'Verzoek': require('./../../../assets/2. Icons/Verzoek Gradient.png'),
    'Incident': require('./../../../assets/2. Icons/Incident Gradient.png'),
  };

  const fiboIcons: { [key: string]: { color: string; symbol: string } } = {
    'Normal': { color: 'yellow', symbol: '^' },
    'Kritiek': { color: 'black', symbol: '^' },
    'Hoog': { color: 'red', symbol: '^' },
  };

  const defaultLicentieIcon = require('./../../../assets/Product Logo/7. IRIS.png');
  const defaultTypeIcon = require('./../../../assets/2. Icons/Verzoek Gradient.png');

  const licentieIcon = data.licentie && licentieIcons[data.licentie] ? licentieIcons[data.licentie] : defaultLicentieIcon;
  const typeIcon = data.type && typeIcons[data.type] ? typeIcons[data.type] : defaultTypeIcon;
  const fiboIcon = data.fibo && fiboIcons[data.fibo] ? fiboIcons[data.fibo] : { color: 'gray', symbol: '-' };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('IncidentDetail', { incident: data })} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={licentieIcon} style={styles.avatar} defaultSource={defaultLicentieIcon} />
          <View style={styles.headerContent}>
            <Text style={styles.title} numberOfLines={1}>{data.onderwerp}</Text>
            <View style={styles.infoRow}>
              <Image source={typeIcon} style={styles.icon} defaultSource={defaultTypeIcon} />
              <Text style={styles.infoText}>{data.zaaknummer}</Text>
              <Text style={[styles.fiboSymbol, { color: fiboIcon.color }]}>{fiboIcon.symbol}</Text>
              <Image source={require('./../../../assets/2. Icons/Date Grey.png')} style={styles.icon} />
              <Text style={styles.infoText}>{new Date(data.gemaaktOp).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  headerContent: {
    flex: 1,
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
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  fiboSymbol: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default Card;
