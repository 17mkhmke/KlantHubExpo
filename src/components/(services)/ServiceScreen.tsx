import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import ZakenScreen from '../../screens/ZakenScreen';
import PlatformScreen from '../../screens/PlatformScreen';
const Stack = createStackNavigator();
const ServiceStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00A7DB',
      },
      headerTintColor: 'white',
      headerTitle: '',
    }}
    >
      <Stack.Screen name="Service" component={ServiceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Zaken" component={ZakenScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Platform" component={PlatformScreen} />

    </Stack.Navigator>
  );
};

const ServiceScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#009ACE', '#00629A']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Service</Text>
        <Image source={require('./../../../assets/Service.png')} style={styles.ServiceImage} />
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Zaken')}>
            <Image source={require('./../../../assets/Zaken Blue.png')} style={styles.cardImage} />
            <Text style={styles.iconText}>Zaken</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BugsEnWensen')}>
            <Image source={require('./../../../assets/BugsEnWensen.png')} style={styles.cardImage} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Platform')}>
            <Image source={require('./../../../assets/Platform Blue.png')} style={styles.cardImage} />
            <Text style={styles.iconText}>Platform</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SLA')}>
            <Image source={require('./../../../assets/SLA.png')} style={styles.cardImage} />
          </TouchableOpacity> */}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    alignItems: 'center',
    marginLeft: 65,
  },
  ServiceImage: {
    width: 300,
    height: 300,
    marginBottom: 60,
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 150,
    height: 100,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  headerButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#007BB5',
    borderRadius: 5,
  },
  headerButtonText: {
    color: 'white',
  },
  iconText: {
    color: '#00629A',
    fontWeight: 'bold',
  }
});


export default ServiceStack;