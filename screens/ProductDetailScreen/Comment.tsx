import React from 'react';
import { View } from 'react-native';
import {
    Caption,
    Chip,
    Paragraph,
    Subheading,
    useTheme,
    Text,
} from 'react-native-paper';
import FromNow from '../../components/FromNow/FromNow';
import Rating from '../../components/Rating';
import styles from './styles';
import { Review } from './types';

interface CommentProps {
    review: Review;
}

const Comment: React.FC<CommentProps> = ({ review }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.commentContainer}>
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
            {review.likesCount > 0 && (
                <Caption>
                    {review.likesCount} person{review.likesCount > 1 && 's'}{' '}
                    found this helpful
                </Caption>
            )}
            <View style={styles.reviewContainer}>
                <Caption>Was this review helpful ?</Caption>
                <View style={styles.row}>
                    <Chip
                        focusable
                        onPress={() => console.log('Yes')}
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
                    <Chip
                        focusable
                        onPress={() => console.log('No')}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: colors.background,
                                borderColor: colors.text,
                            },
                        ]}
                    >
                        No
                    </Chip>
                </View>
            </View>
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
