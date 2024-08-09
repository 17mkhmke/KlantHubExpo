import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { licenties } from '../../core/utils/licentie';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-elements';
const ProductGrid = ({ navigation }) => {
  return (
    
    <ScrollView contentContainerStyle={styles.grid}>
       <LinearGradient
        colors={['#009ACE', '#00629A']}
        style={styles.background}
      />
      {licenties.map((product, index) => (
        <TouchableOpacity
          key={index}
          style={styles.gridItem}
          onPress={() => navigation.navigate('ProductDetails', { routeKaartQueryId: product.routeKaartQueryId })}
        >
          <Image source={product.logo} style={styles.image} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: '20%',
    margin: 10,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 5500,
    zIndex: -1,
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
  },
});
export default ProductGrid;