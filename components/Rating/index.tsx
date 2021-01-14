import React from 'react';
import { View } from 'react-native';
import { Caption } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

interface Props {
    rating: number;
    total?: number;
    size?: number;
}

const Rating: React.FC<Props> = ({ rating, total, size }) => (
    <View style={styles.container}>
        {[1, 2, 3, 4, 5].map(i =>
            rating >= i ? (
                <FontAwesome name="star" size={size || 17} key={i} />
            ) : rating >= i - 0.5 ? (
                <FontAwesome name="star-half-full" size={size || 17} key={i} />
            ) : (
                <FontAwesome name="star-o" size={size || 17} key={i} />
            )
        )}
        {!isNaN(total as number) && <Caption> ({total})</Caption>}
    </View>
);

interface NewRatingProps {
    onRatingChange: (rating: number) => void;
}

export default Rating;
