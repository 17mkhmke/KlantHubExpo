import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Incident } from '../../core/utils/interfaces';


type RootStackParamList = {
  IncidentDetail: { incident: Incident };
};

type IncidentDetailRouteProp = RouteProp<RootStackParamList, 'IncidentDetail'>;
type IncidentDetailNavigationProp = StackNavigationProp<RootStackParamList, 'IncidentDetail'>;

interface IncidentDetailProps {
  route: IncidentDetailRouteProp;
  navigation: IncidentDetailNavigationProp;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ route, navigation }) => {
  const { incident } = route.params;
  const {
    zaaknummer,
    type,
    onderwerp,
    beschrijving,
    licentie,
    fibo,
    prioriteit,
    melder,
    melderPhoto,
    behandelaar,
    behandelaarPhoto,
  } = incident;

  const typeMapping = {
    1: "Incident",
    2: "Beheer",
    3: "Bug",
    4: "Verzoek",
    5: "Wens",
    564710002: "Project",
    564710001: "Offerte",
  };

  const fiboMapping = {
    564710001: "-1",
    799880002: "0",
    100000001: "1",
    100000002: "2",
    100000003: "3",
    100000004: "5",
    100000005: "8",
    100000006: "13",
    100000007: "21",
    799880001: "34",
  };

  const prioriteitMapping = {
    799880000: "Kritiek",
    1: "Hoog",
    2: "Normaal",
    3: "Laag",
  };

  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.label}>Zaaknummer:</Text>
          <Text style={styles.value}>{zaaknummer}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Onderwerp:</Text>
          <Text style={styles.value}>{onderwerp}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Beschrijving:</Text>
          <Text style={styles.value}>{beschrijving}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Melder:</Text>
          <Text style={styles.value}>{melder}</Text>
          <Image style={styles.photo} source={{ uri: `data:image/jpeg;base64,${melderPhoto}` }} />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Behandelaar:</Text>
          <Text style={styles.value}>{behandelaar}</Text>
          <Image style={styles.photo} source={{ uri: `data:image/jpeg;base64,${behandelaarPhoto}` }} />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Product:</Text>
          <Text style={styles.value}>{licentie}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>FIBO:</Text>
          <Text style={styles.value}>{fiboMapping[fibo] || fibo}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Prioriteit:</Text>
          <Text style={styles.value}>{prioriteitMapping[prioriteit] || prioriteit}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{typeMapping[type] || type}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  backButton: {
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: 'white',
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 8,
  },
});

export default IncidentDetail;
