import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
    Caption,
    Chip,
    Paragraph,
    Subheading,
    useTheme,
    Text,
} from 'react-native-paper';

import * as api from './api';
import FromNow from '../../components/FromNow/FromNow';
import Rating from '../../components/Rating';
import styles from './styles';
import { Review } from './types';
import { useAlert, useTypedSelector } from '../../utils/hooks';

interface CommentProps {
    review: Review;
}

const Comment: React.FC<CommentProps> = ({ review }) => {
    const { colors } = useTheme();

    const isLoggedIn = useTypedSelector(state => state.user.isLoggedIn);
    const setAlert = useAlert();
    const [likeReview] = useMutation(api.LIKE_REVIEW);
    const [unlikeReview] = useMutation(api.UNLIKE_REVIEW);
    const [likeCount, setLikeCount] = useState(review.likesCount);
    const [isLiked, setIsLiked] = useState(review.isLiked);

    const onLike = async () => {
        try {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
            console.log('liking');
            await likeReview({ variables: { reviewId: review.id } });
            console.log('done');
        } catch (err) {
            console.error(err);
            // setAlert({ text: err, type: 'danger' });
        }
    };
    const onUnlike = () => {
        try {
            unlikeReview({ variables: { reviewId: review.id } });
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } catch (err) {
            console.error(err);
            // setAlert({ text: err, type: 'danger' });
        }
    };
    return (
        <View style={styles.commentContainer}>
            {/* <Text>{JSON.stringify(review)}</Text> */}
            <View>
                <Subheading style={{ fontWeight: 'bold' }}>
                    {review.user.name}
                </Subheading>
            </View>
            <View style={styles.ratingWithDate}>
                <Rating rating={review.rating} size={15} />
                <FromNow date={review.createdOn} />
            </View>
            <Paragraph>{review.text}</Paragraph>
            {likeCount > 0 && (
                <Caption>
                    {likeCount} person{likeCount > 1 && 's'} found this helpful
                </Caption>
            )}
            {isLoggedIn && (
                <View style={styles.reviewContainer}>
                    <Caption>Was this review helpful ?</Caption>
                    <View style={styles.row}>
                        <Chip
                            focusable
                            onPress={() => {
                                if (!isLiked) onLike();
                                else onUnlike();
                            }}
                            selected={isLiked}
                            style={[
                                styles.chip,
                                {
                                    backgroundColor: colors.background,
                                    borderColor: colors.text,
                                },
                            ]}
                        >
                            Yes
                        </Chip>
                    </View>
                </View>
            )}
        </View>
    );
};

interface NewCommentProps {}

const NewComment: React.FC<NewCommentProps> = ({}) => {
    return (
        <View>
            <Text>New Comment</Text>
        </View>
    );
};

export default Comment;

export { NewComment };
