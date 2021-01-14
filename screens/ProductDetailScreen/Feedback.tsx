import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import {
    Text,
    Caption,
    ProgressBar,
    Divider,
    useTheme,
    Button,
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';

import Rating from '../../components/Rating';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import styles from './styles';
import Comment from './Comment';
import { Review } from './types';
import * as api from './api';
import { useTypedSelector } from '../../utils/hooks';

interface NewFeedbackProps {
    productId: string;
    myReview?: Review;
}

const NewFeedback: React.FC<NewFeedbackProps> = ({
    productId,
    myReview: _myReview,
}) => {
    const [addReview] = useMutation(api.ADD_REVIEW);

    const { colors } = useTheme();
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [myReview, setMyReview] = useState<{
        rating: number | undefined;
        text: string | undefined;
    }>({ rating: _myReview?.rating, text: _myReview?.text });

    const [done, setDone] = useState(myReview !== undefined);
    console.log(myReview);

    const onCancel = () => {
        setText('');
        setRating(0);
    };

    const onSubmit = async () => {
        try {
            setMyReview({ rating, text });
            setDone(true);
            await addReview({ variables: { productId, text: text, rating } });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header style={{ paddingBottom: 0 }}>
                {done ? 'Your review' : 'Rate this product'}
            </Header>
            {!done && <Caption>Tell others what you think</Caption>}
            <View style={styles.newFeedbackContainer}>
                <View style={styles.newRatingContainer}>
                    {[1, 2, 3, 4, 5].map(i => {
                        if (done) {
                            return (
                                <FontAwesome
                                    name={
                                        myReview.rating >= i ? 'star' : 'star-o'
                                    }
                                    size={30}
                                    key={i}
                                    color={colors.primary}
                                />
                            );
                        } else {
                            return (
                                <FontAwesome
                                    name={rating >= i ? 'star' : 'star-o'}
                                    onPress={() => setRating(i)}
                                    size={30}
                                    key={i}
                                    color={colors.primary}
                                />
                            );
                        }
                    })}
                </View>

                <TextInput
                    placeholder="Describe your experience (Optional)"
                    focusable
                    style={styles.newReviewInput}
                    value={done ? myReview.text : text}
                    disabled={done}
                    onChangeText={text => setText(text)}
                />
                <View style={styles.doubleButtonContainer}>
                    <Button
                        focusable
                        // mode="contained"
                        onPress={onCancel}
                        style={styles.btn}
                        color={colors.error}
                        disabled={done}
                    >
                        Cancel
                    </Button>

                    <Button
                        focusable
                        // mode="contained"
                        onPress={onSubmit}
                        style={styles.btn}
                        disabled={rating === 0}
                    >
                        Post Review
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

interface FeedbackProps {
    productId: string;
    reviews: Review[];
}

const Feedback: React.FC<FeedbackProps> = ({ reviews, productId }) => {
    const { email, isLoggedIn } = useTypedSelector(state => state.user);

    let rating = 0;
    reviews.forEach(rev => {
        rating += rev.rating;
    });
    rating /= reviews.length || 1;

    const myReview = isLoggedIn
        ? reviews.filter(rev => rev.user.email === email)
        : undefined;

    const getWidth = (i: number): number => {
        const width =
            reviews.filter(_rev => _rev.rating === i).length / reviews.length;
        return width;
    };

    return (
        <>
            {isLoggedIn && (
                <NewFeedback
                    productId={productId}
                    myReview={myReview?.length ? myReview[0] : undefined}
                />
            )}
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
