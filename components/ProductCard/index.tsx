import React, { useState } from 'react';
import { View, Image } from 'react-native';
import {
    Caption,
    Title,
    Text,
    Badge,
    Surface,
    TouchableRipple,
    IconButton,
    useTheme,
} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

import Rating from '../Rating';
import styles from './styles';

interface Props {
    product: {
        id: string;
        name: string;
        photos: { url: string }[];
        price: number;
        discount: number;
        reviews?: { rating: number }[];
        stock?: number;
    };
    view: (productId: string) => void;
    quantity?: number;
    setQuantity?: (id: string, productId: string, qty: number) => void;
    id?: string;
}

const ProductCard: React.FC<Props> = ({
    product,
    view,
    quantity,
    setQuantity,
    id,
}) => {
    const newPrice = Math.ceil(
        product.price - (product.discount * product.price) / 100
    );

    let rating = 0;
    if (product.reviews) {
        product.reviews.forEach(r => (rating += r.rating));
        rating /= product.reviews.length || 1;
    }

    const { colors } = useTheme();

    const inCart = !isNaN(quantity as number) && setQuantity;

    const changeQty = (change: number) => {
        setQuantity?.(id as string, product.id, (quantity as number) + change);
    };

    if (inCart && !quantity) return null;

    return (
        <TouchableRipple style={styles.card} onPress={() => view(product.id)}>
            <Surface focusable style={{ elevation: 4, borderRadius: 10 }}>
                <Badge
                    style={styles.badge}
                    size={40}
                    visible={product.discount > 0 && !inCart}
                >
                    {`-${product.discount}%`}
                </Badge>
                <View style={{ flexDirection: inCart ? 'row' : 'column' }}>
                    <Image
                        style={{
                            width: inCart ? 100 : '100%',
                            height: inCart ? 100 : 250,
                            marginTop: 10,
                        }}
                        source={{
                            uri:
                                product.photos.length && true
                                    ? product.photos[0].url
                                    : `http://via.placeholder.com/100/fff?text=${product.name[0]}`,
                        }}
                        resizeMode="contain"
                    />
                    <View style={styles.about}>
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
                            {!inCart && (
                                <Rating
                                    rating={rating}
                                    total={product.reviews?.length}
                                />
                            )}
                        </View>
                        {inCart && (
                            <Text
                                style={{
                                    color:
                                        (product.stock || 0) >= (quantity || 0)
                                            ? colors.success
                                            : colors.error,
                                }}
                            >
                                {!product.stock
                                    ? 'Out of stock'
                                    : product.stock >= (quantity || 0)
                                    ? 'In stock'
                                    : `Only ${product.stock} in stock`}
                            </Text>
                        )}
                    </View>
                </View>
                {inCart && (
                    <View style={styles.quantityContainer}>
                        <IconButton
                            icon={() => <Entypo name="minus" size={20} />}
                            style={[
                                styles.quantityIcon,
                                styles.quantityIconLeft,
                            ]}
                            onPress={() => changeQty(-1)}
                        />
                        <Text style={styles.quantity}>{quantity}</Text>
                        <IconButton
                            icon={() => <Entypo name="plus" size={20} />}
                            style={[
                                styles.quantityIcon,
                                styles.quantityIconRight,
                            ]}
                            onPress={() => changeQty(1)}
                        />
                    </View>
                )}
            </Surface>
        </TouchableRipple>
    );
};

export default ProductCard;
