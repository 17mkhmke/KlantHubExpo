import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { licenties } from './../core/utils/products';

interface Product {
  name: string;
  logo: any; // Replace 'any' with the correct type for your images if possible, like ImageSourcePropType
}

interface ProductSelectorProps {
  onSelect: (item: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ onSelect }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelect(item)}
    >
      <Image source={item.logo} style={styles.image} />
      {/* <Text style={styles.text}>{item.name}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.blurView}>
        <View style={styles.overlay} />
        <View style={styles.container}>
          {/* <Text style={styles.title}>Selecteer een product</Text> */}
          <FlatList
            data={licenties}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={3}
            contentContainerStyle={styles.grid}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  blurView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // White with transparency
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Blue with transparency
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: 49,
    height: 49,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProductSelector;
