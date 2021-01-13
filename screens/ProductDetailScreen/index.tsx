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
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={styles.price}>₹ {newPrice} </Text>
                    {product.discount > 0 && (
                        <Caption style={styles.cross}>
                            ₹ {product.price}
                        </Caption>
                    )}
                </View>

                <View style={styles.doubleButtonContainer}>
                    <Button
                        style={styles.btn}
                        focusable
                        mode="contained"
                        onPress={() => console.log('hi')}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        style={styles.btn}
                        focusable
                        mode="contained"
                        onPress={() => console.log('hi')}
                        color={colors.accent}
                    >
                        Buy Now
                    </Button>
                </View>
            </View>
            <Divider focusable></Divider>
            <Feedback reviews={product.reviews} productId={product.id} />
        </ScrollView>
    );
};

export default ProductDetailScreen;
