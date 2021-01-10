import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Title, Text, Caption, ProgressBar, Divider } from 'react-native-paper';

import Rating from '../../components/Rating';
import Header from '../../components/Header';
import { Review } from './types';
import styles from './styles';
import Comment from './Comment';

interface FeedbackProps {
    reviews: Review[];
}

const Feedback: React.FC<FeedbackProps> = ({ reviews }) => {
    let rating = 0;
    reviews.forEach(rev => {
        rating += rev.rating;
    });
    rating /= reviews.length || 1;

    const getWidth = (i: number): number => {
        const width =
            reviews.filter(_rev => _rev.rating === i).length / reviews.length;
        return width;
    };

    return (
        <>
            <View style={styles.container}>
                <Header>Ratings and Reviews</Header>
                <View style={styles.feedback}>
                    <View style={styles.feedback__rating}>
                        <Text style={styles.feedback__rating_text}>
                            {rating.toFixed(1)}
                        </Text>
                        <View style={styles.feedback__rating_stars}>
                            <Rating rating={rating} />
                            <Caption>{reviews.length}</Caption>
                        </View>
                    </View>
                    <View style={styles.feedback__bars}>
                        {[5, 4, 3, 2, 1].map(i => (
                            <View
                                key={i}
                                style={styles.feedback__bar_container}
                            >
                                <View>
                                    <Text>{i + '    '}</Text>
                                </View>
                                <View style={{ width: '95%' }}>
                                    <ProgressBar
                                        focusable
                                        progress={getWidth(i)}
                                        style={styles.feedback__bar}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <Divider focusable />
            <View style={styles.container}>
                {reviews.map(review => (
                    <Comment key={review.id} review={review} />
                ))}
            </View>
        </>
    );
};

export default Feedback;
