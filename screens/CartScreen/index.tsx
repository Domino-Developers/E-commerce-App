import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
    Text,
    ActivityIndicator,
    Button,
    Portal,
    Dialog,
    useTheme,
} from 'react-native-paper';
import OrderConfirmPopup from '../../components/OrderConfirmPopUp/OrderConfirmPopup';

import ProductCard from '../../components/ProductCard';
import { ProductsNavProps } from '../../navigation/ParamList';
import { useAlert } from '../../utils/hooks';
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
    id: string;
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
    const { colors } = useTheme();
    const [setQty] = useMutation(api.SET_QUANTITY);
    const [order] = useMutation(api.ORDER);
    const setAlert = useAlert();
    const cart = data?.me.cart;
    const [dialog, setDialog] = useState(false);
    const [orderConfirmDialog, setOrderConfirm] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const setQuantity = async (id: string, productId: string, qty: number) => {
        try {
            await setQty({
                variables: { productId, qty },
                optimisticResponse: {
                    __typename: 'Mutation',
                    setCart: {
                        __typename: 'SetCart',
                        cart: {
                            id,
                            __typename: 'CartType',
                            qty,
                        },
                    },
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const renderItem = ({ item }: { item: CartObj }) => (
        <ProductCard
            id={item.id}
            product={item.product}
            view={id => navigation.navigate('ProductDetail', { id })}
            quantity={item.qty}
            setQuantity={setQuantity}
        />
    );

    if (!cart) return <ActivityIndicator focusable />;

    if (!cart.length)
        return (
            <Text style={{ margin: 20 }}>
                Nothing here. Start by adding a product to your cart.
            </Text>
        );

    const startOrder = async () => {
        setOrderLoading(true);
        let res;

        try {
            const lessStock = cart.findIndex(c => c.qty > c.product.stock);

            if (lessStock === -1) {
                res = await order({ variables: { addressId: '1' } });
                console.log(res);
            } else {
                setDialog(true);
            }
        } catch (err) {
            console.error(err);
        }

        setOrderLoading(false);

        if (res) {
            setAlert({ text: 'Ordered Successfull!!', type: 'success' });
            navigation.navigate('Orders', {
                screen: 'OrderDetail',
                params: { id: res.data.orderCart.order.id },
            });
        }
    };

    return (
        <>
            <Portal>
                <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
                    <Dialog.Title>Not in Stock</Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            Some items in your cart are not in stock. Please
                            change the quantity and try again.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button focusable onPress={() => setDialog(false)}>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <OrderConfirmPopup
                visible={orderConfirmDialog}
                setVisible={setOrderConfirm}
                onOrder={startOrder}
            />
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Button
                focusable
                mode="contained"
                onPress={() => setOrderConfirm(true)}
                loading={orderLoading}
                disabled={orderLoading}
            >
                Order
            </Button>
        </>
    );
};

export default CartScreen;
