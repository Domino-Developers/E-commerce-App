import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
    Divider,
    Text,
    Surface,
    Title,
    Caption,
    useTheme,
    Button,
    Paragraph,
    Headline,
} from 'react-native-paper';

import FullPageLoading from '../../components/FullPageLoading';
import FullButton from '../../components/FullButton';
import { ProductsNavProps } from '../../navigation/ParamList';
import { useAlert, useTypedSelector } from '../../utils/hooks';
import Header from '../../components/Header';
import * as api from './api';
import styles from './styles';
import Feedback from './Feedback';
// import Reviews from './Reviews';
import { ProductData } from './types';
import Carousel from './Carousel';
import OrderConfirmPopup from '../../components/OrderConfirmPopUp/OrderConfirmPopup';

const ProductDetailScreen: React.FC<ProductsNavProps<'ProductDetail'>> = ({
    route,
    navigation,
}) => {
    const setAlert = useAlert();
    const loggedIn = useTypedSelector(state => state.user.isLoggedIn);
    const [addToCart, { loading: cartLoading }] = useMutation(api.ADD_TO_CART);
    const [order] = useMutation(api.ORDER_PRODUCT);
    const { colors } = useTheme();
    const [orderConfirm, setOrderConfirm] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const { data, loading, error } = useQuery<ProductData>(api.GET_PRODUCT, {
        variables: { id: route.params.id, loggedIn },
    });

    useEffect(() => {
        if (error) {
            setAlert({
                text: 'Some Error occured please try again',
                type: 'danger',
            });
        }
    }, [error]);

    if (loading) {
        return <FullPageLoading />;
    }

    if (error) {
        console.error(error.graphQLErrors);
        return <Text>Some Error occured please try again</Text>;
    }

    if (!data) {
        return <Text>No data here</Text>;
    }

    const product = data.product;

    const newPrice = Math.ceil(
        product.price - (product.discount * product.price) / 100
    );

    const onAddToCart = async () => {
        await addToCart({ variables: { productId: product.id } });
        setAlert({ text: 'Product added to cart!', type: 'success' });
    };
    const startOrder = async () => {
        setOrderLoading(true);
        try {
            const res = await order({
                variables: { productId: product.id, addressId: '1' },
            });
            console.log(res);
            setOrderLoading(false);
            setAlert({ text: 'Ordered Successfully', type: 'success' });

            navigation.navigate('Orders', {
                screen: 'OrderDetail',
                params: { id: res.data.orderProduct.order.id },
            });
        } catch (err) {
            setOrderLoading(false);
            console.error(err);
            setAlert({ text: 'Order Failed please try again', type: 'danger' });
        }
    };

    return (
        <>
            <OrderConfirmPopup
                visible={orderConfirm}
                setVisible={setOrderConfirm}
                onOrder={startOrder}
            />

            <ScrollView>
                <View style={styles.container}>
                    <Header>{product.name}</Header>
                </View>
                <Divider focusable />
                {/* <Text>{JSON.stringify(product)}</Text> */}
                {product.photos.length > 0 ? (
                    <Carousel photos={product.photos} />
                ) : (
                    <Text>Sorry no photos available</Text>
                )}
                <Divider focusable />
                <View style={styles.descriptionArea}>
                    <Header>About</Header>
                    <Paragraph>{product.description}</Paragraph>
                </View>
                <Divider focusable />
                <View style={styles.priceArea}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'flex-end' }}
                    >
                        <Text style={styles.price}>₹ {newPrice} </Text>
                        {product.discount > 0 && (
                            <Caption style={styles.cross}>
                                ₹ {product.price}
                            </Caption>
                        )}
                    </View>
                    <Text>
                        {product.stock > 0
                            ? 'In Stock'
                            : 'Sorry currently unavailable!'}
                    </Text>
                    <View style={styles.doubleButtonContainer}>
                        <Button
                            style={styles.btn}
                            focusable
                            mode="contained"
                            onPress={onAddToCart}
                            loading={cartLoading}
                            disabled={!loggedIn}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            style={styles.btn}
                            focusable
                            mode="contained"
                            onPress={() => setOrderConfirm(true)}
                            color={colors.accent}
                            disabled={product.stock === 0 || !loggedIn}
                        >
                            Buy Now
                        </Button>
                    </View>
                </View>
                <Divider focusable></Divider>
                <Feedback reviews={product.reviews} productId={product.id} />
            </ScrollView>
        </>
    );
};

export default ProductDetailScreen;
