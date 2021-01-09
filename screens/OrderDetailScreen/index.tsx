import { useQuery } from '@apollo/client';
import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import {
    Caption,
    Surface,
    Text,
    Title,
    ActivityIndicator,
    TouchableRipple,
} from 'react-native-paper';

import { OrderNavProps } from '../../navigation/ParamList';
import styles from './styles';
import * as api from './api';
import formatDate from '../../utils/formatDate';
import formatStatus from '../../utils/formatStatus';

interface ProductObject {
    product: {
        id: string;
        name: string;
        photos: { url: string }[];
    };
    qty: number;
    price: number;
}

interface OrderData {
    order: {
        id: string;
        orderTimestamp: string;
        status: string;
        name: string;
        phone: string;
        address1: string;
        address2: string;
        pincode: number;
        city: string;
        state: string;
        productObjects: ProductObject[];
    };
}

const Product: React.FC<{
    productObj: ProductObject;
    navigation: OrderNavProps<'OrderDetail'>['navigation'];
}> = ({ productObj, navigation }) => (
    <TouchableRipple
        onPress={() =>
            navigation.navigate('Products', {
                screen: 'ProductDetail',
                params: { id: productObj.product.id },
            })
        }
    >
        <View style={styles.productContainer}>
            <Image
                style={styles.image}
                source={{
                    uri: productObj.product.photos.length
                        ? productObj.product.photos[0].url
                        : `http://via.placeholder.com/100/fff?text=${productObj.product.name[0]}`,
                }}
                resizeMode="contain"
            />
            <View>
                <Text>{productObj.product.name}</Text>
                <Caption>Qty: {productObj.qty}</Caption>
            </View>
            <Text style={styles.price}>
                ₹{productObj.price * productObj.qty}
            </Text>
        </View>
    </TouchableRipple>
);

const OrderDetailScreen: React.FC<OrderNavProps<'OrderDetail'>> = ({
    route,
    navigation,
}) => {
    const { data } = useQuery<OrderData>(api.GET_ORDER, {
        variables: {
            orderId: route.params.id,
        },
    });

    const order = data?.order;

    if (!order) return <ActivityIndicator focusable />;

    let totalPrice = 0;
    let totalItems = 0;

    order.productObjects.forEach(p => {
        totalItems += p.qty;
        totalPrice += p.price * p.qty;
    });

    return (
        <ScrollView>
            <Surface focusable style={styles.section}>
                <View style={styles.row}>
                    <Text>Order date</Text>
                    <Text>{formatDate(order.orderTimestamp)}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Order id</Text>
                    <Text>{order.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Order total</Text>
                    <Text>
                        ₹{totalPrice} ({totalItems} items)
                    </Text>
                </View>
            </Surface>
            <Surface focusable style={styles.section}>
                <Title>Status: {formatStatus(order.status)}</Title>
                {order.productObjects.map(p => (
                    <Product
                        productObj={p}
                        navigation={navigation}
                        key={p.product.id}
                    />
                ))}
            </Surface>
            <Surface focusable style={styles.section}>
                <Title>Payment & Shipping</Title>
                <Text>{order.name} (Cash on Delivery)</Text>
                <Text>{order.phone}</Text>
                <Text>{order.address1}</Text>
                <Text>{order.address2}</Text>
                <Text>{order.city}</Text>
                <Text>{order.state}</Text>
                <Text>{order.pincode}</Text>
            </Surface>
        </ScrollView>
    );
};

export default OrderDetailScreen;
