import React from 'react';
import {
    StyleSheet,
    TextStyle,
    ViewStyle,
    ImageStyle,
    View,
} from 'react-native';
import { Caption, Card, Title, Text, Badge } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

import { ProductsOverviewNavProps } from '../navigation/ParamList';

interface Props {
    product: {
        id: string;
        name: string;
        photos: { url: string }[];
        price: number;
        discount: number;
        reviews: { rating: number }[];
    };
    navigation: ProductsOverviewNavProps<'Cloth' | 'Jewellery'>['navigation'];
}

const ProductCard: React.FC<Props> = ({ product, navigation }) => {
    const newPrice = Math.ceil(
        product.price - (product.discount * product.price) / 100
    );
    let rating = 0;
    product.reviews.forEach(r => (rating += r.rating));
    rating /= product.reviews.length || 1;

    return (
        <Card
            style={styles.card}
            focusable={true}
            onPress={() =>
                navigation.navigate('ProductDetail', { id: product.id })
            }
        >
            <Badge
                style={styles.badge}
                size={40}
                visible={product.discount > 0}
            >
                {`-${product.discount}%`}
            </Badge>
            <Card.Cover
                style={styles.image}
                source={{
                    uri:
                        product.photos.length && true
                            ? product.photos[0].url
                            : `http://via.placeholder.com/100?text=${product.name[0]}`,
                }}
            />
            <Card.Content>
                <Text style={styles.title}>{product.name}</Text>
                <View style={styles.details}>
                    <Text>
                        <Title>₹ {newPrice}</Title>
                        {'   '}
                        {product.discount > 0 && (
                            <Caption style={styles.cross}>
                                ₹ {product.price}
                            </Caption>
                        )}
                    </Text>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map(i =>
                            rating >= i ? (
                                <FontAwesome name="star" size={17} key={i} />
                            ) : rating >= i - 0.5 ? (
                                <FontAwesome
                                    name="star-half-full"
                                    size={17}
                                    key={i}
                                />
                            ) : (
                                <FontAwesome name="star-o" size={17} key={i} />
                            )
                        )}
                        <Caption> ({product.reviews.length})</Caption>
                    </View>
                </View>
            </Card.Content>
            <View style={styles.details}></View>
        </Card>
    );
};

interface Styles {
    title: TextStyle;
    details: ViewStyle;
    card: ViewStyle;
    image: ImageStyle;
    badge: TextStyle;
    cross: TextStyle;
    stars: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    title: {
        marginVertical: 5,
        letterSpacing: 1,
        fontSize: 20,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    card: {
        margin: 20,
    },
    image: {
        height: 250,
    },
    badge: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1,
        fontSize: 15,
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cross: {
        textDecorationLine: 'line-through',
    },
});

export default ProductCard;
