import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductSelector from './../components/productSelect';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ProductSelectionScreen: { nextScreen: string };
  [key: string]: { product: any } | undefined;
};

type ProductSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductSelectionScreen'
>;

type ProductSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductSelectionScreen'
>;

type Props = {
  navigation: ProductSelectionScreenNavigationProp;
  route: ProductSelectionScreenRouteProp;
};

const ProductSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { nextScreen } = route.params;

  const handleSelect = (item: any) => {
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
