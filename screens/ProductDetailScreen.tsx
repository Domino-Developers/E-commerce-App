import React from 'react';
import { Text } from 'react-native';
import { ProductsNavProps } from '../navigation/ParamList';

const ProductDetailScreen: React.FC<ProductsNavProps<'ProductDetail'>> = ({
    route,
}) => <Text>Product Detail {route.params.id}</Text>;

export default ProductDetailScreen;
