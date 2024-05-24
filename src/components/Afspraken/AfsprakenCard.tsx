import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { appointments } from '../../core/utils/Appointments';
import { Appointment } from '../../core/utils/interfaces';
  

const AfsprakenCards = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {appointments.map((appointment: Appointment, index: number) => (
          <View key={index} style={styles.card}>
            <Image source={appointment.image} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{appointment.name}</Text>
              <Text style={styles.title}>{appointment.role}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Image source={require('./../../../assets/2. Icons/Email Blue.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('./../../../assets/2. Icons/Bubble Blue.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('./../../../assets/2. Icons/Phone Blue.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#006098',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006098',
  },
  title: {
    fontSize: 14,
    color: '#006098',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginHorizontal: 7,
  },
});

export default AfsprakenCards;
