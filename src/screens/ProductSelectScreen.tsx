import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductSelector from './../components/productSelect';

const ProductSelectionScreen = ({ navigation, route }) => {
  const { nextScreen } = route.params;

  const handleSelect = (item) => {
    navigation.navigate(nextScreen, { product: item });
  };

  return (
    <View style={styles.container}>
      <ProductSelector onSelect={handleSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductSelectionScreen;
