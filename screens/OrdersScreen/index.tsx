import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import {
    ActivityIndicator,
    Text,
    Caption,
    Surface,
    Badge,
    useTheme,
    TouchableRipple,
} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import * as api from './api';
import styles from './styles';
import { OrderNavProps } from '../../navigation/ParamList';
import formatStatus from '../../utils/formatStatus';

interface ProductObject {
    product: {
        id: string;
        name: string;
        photos: { url: string }[];
    };
    qty: number;
}

interface OrdersData {
    orders: {
        id: string;
        status: string;
        productObjects: ProductObject[];
    }[];
}

interface ProductContainer {
    productObj: ProductObject;
    orderId: string;
    status: string;
    navigation?: OrderNavProps<'Orders'>['navigation'];
}

const Product: React.FC<ProductContainer> = ({
    productObj,
    status,
    orderId,
    navigation,
}) => {
    const { colors } = useTheme();

    return (
        <TouchableRipple
            onPress={() => navigation?.navigate('OrderDetail', { id: orderId })}
        >
            <Surface focusable style={styles.productContainer}>
                <Badge
                    style={[
                        styles.badge,
                        { backgroundColor: colors.surface, color: colors.text },
                    ]}
                    size={20}
                    visible={productObj.qty > 1}
                >
                    {productObj.qty}
                </Badge>
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
                    <Caption>{formatStatus(status)}</Caption>
                </View>
                <Entypo
                    name="chevron-right"
                    size={25}
                    color="#888"
                    style={styles.arrow}
                />
            </Surface>
        </TouchableRipple>
    );
};

const OrdersScreen: React.FC<OrderNavProps<'Orders'>> = ({
    navigation,
    route,
}) => {
    const { data, refetch } = useQuery<OrdersData>(api.GET_ORDERS);

    const orders = data?.orders;

    useEffect(() => {
        const redirect = route.params?.redirect;
        if (redirect) navigation.navigate('OrderDetail', { id: redirect });

        return navigation.addListener('focus', () => refetch());
    });

    useEffect(() => {
        return navigation.addListener('blur', () =>
            navigation.setParams({ redirect: undefined })
        );
    });

    if (!orders) return <ActivityIndicator focusable />;

    if (!orders.length) return <Text>No orders yet</Text>;

    let ordersData: ProductContainer[] = [];

    orders.forEach(order => {
        const formattedProducts = order.productObjects.map(productObj => ({
            productObj,
            orderId: order.id,
            status: order.status,
        }));
        ordersData = [...ordersData, ...formattedProducts];
    });

    const renderItem = ({ item }: { item: ProductContainer }) => (
        <Product
            orderId={item.orderId}
            status={item.status}
            productObj={item.productObj}
            navigation={navigation}
        />
    );

    return (
        <FlatList
            data={ordersData}
            renderItem={renderItem}
            keyExtractor={item =>
                item.orderId + ' ' + item.productObj.product.id
            }
        />
    );
};

export default OrdersScreen;
