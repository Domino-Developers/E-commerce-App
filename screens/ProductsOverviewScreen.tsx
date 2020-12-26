import React from 'react';
import { Text } from 'react-native';

import { ProductsOverviewNavProps } from '../navigation/ParamList';

const ProductsOverviewScreen: React.FC<
    ProductsOverviewNavProps<'Cloth' | 'Jewellery'>
> = ({ route }) => <Text>Product Overview: {route.name}</Text>;

export default ProductsOverviewScreen;
