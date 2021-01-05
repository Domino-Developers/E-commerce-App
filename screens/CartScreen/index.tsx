import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { FlatList } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';

import ProductCard from '../../components/ProductCard';
import { ProductsNavProps } from '../../navigation/ParamList';
import * as api from './api';

interface Product {
    id: string;
    name: string;
    photos: { url: string }[];
    price: number;
    discount: number;
    stock: number;
}

interface CartObj {
    product: Product;
    qty: number;
}

interface CartData {
    me: {
        cart: CartObj[];
    };
}

const CartScreen: React.FC<ProductsNavProps<'Cart'>> = ({ navigation }) => {
    const { data } = useQuery<CartData>(api.GET_CART);
    const [setQty] = useMutation(api.SET_QUANTITY);
    const cart = data?.me.cart;

    const setQuantity = async (productId: string, qty: number) => {
        try {
            await setQty({ variables: { productId, qty } });
        } catch (err) {
            console.error(err);
        }
    };

    const renderItem = ({ item }: { item: CartObj }) => (
        <ProductCard
            product={item.product}
            view={id => navigation.navigate('ProductDetail', { id })}
            quantity={item.qty}
            setQuantity={setQuantity}
        />
    );

    if (!cart) return <ActivityIndicator focusable />;

    if (!cart.length)
        return (
            <Text>Nothing here. Start by adding a product to your cart.</Text>
        );

    return (
        <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.product.id}
        />
    );
};

export default CartScreen;
