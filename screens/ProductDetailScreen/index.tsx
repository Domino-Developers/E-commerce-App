import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {
    Divider,
    Text,
    Surface,
    Title,
    Caption,
    useTheme,
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

const ProductDetailScreen: React.FC<ProductsNavProps<'ProductDetail'>> = ({
    route,
}) => {
    const setAlert = useAlert();
    const loggedIn = useTypedSelector(state => state.user.isLoggedIn);
    const { colors } = useTheme();

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

    return (
        <ScrollView>
            <View style={styles.container}>
                <Header>{product.name}</Header>
            </View>
            <Divider focusable />
            <Text>Carousel here</Text>
            <Divider focusable />
            <Surface
                focusable
                style={[
                    {
                        backgroundColor: colors.surface,
                    },
                    styles.descriptionArea,
                ]}
            >
                <Text>{product.description}</Text>
            </Surface>
            <Divider focusable />
            <View style={styles.priceArea}>
                <Text>
                    <Title>₹ {newPrice}</Title>
                    {'   '}
                    {product.discount > 0 && (
                        <Caption style={styles.cross}>
                            ₹ {product.price}
                        </Caption>
                    )}
                </Text>
                <FullButton
                    focusable
                    color={colors.accent}
                    onPress={() => {
                        // buy
                        console.log('Buy', product.id);
                    }}
                >
                    Buy Now
                </FullButton>
                <FullButton
                    focusable
                    onPress={() => {
                        // add to card
                        console.log('Add to Card', product.id);
                    }}
                >
                    Add to Cart
                </FullButton>
                {/* <Text>{JSON.stringify(product)}</Text> */}
            </View>
            <Divider focusable></Divider>
            <Feedback reviews={product.reviews} />
        </ScrollView>
    );
};

export default ProductDetailScreen;
