import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
    query GetProduct($id: String!, $loggedIn: Boolean!) {
        product(id: $id) {
            id
            name
            price
            discount
            stock
            kind
            description
            photos {
                url
            }
            reviews {
                id
                user {
                    email
                    name
                }
                createdOn
                rating
                text
                likesCount
                isLiked @include(if: $loggedIn)
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation AddReview($productId: String!, $rating: Int!, $text: String!) {
        addReview(productId: $productId, rating: $rating, text: $text) {
            id
            rating
            text
        }
    }
`;

export const LIKE_REVIEW = gql`
    mutation LikeReview($reviewId: String!) {
        likeReview(reviewId: $reviewId) {
            id
        }
    }
`;

export const UNLIKE_REVIEW = gql`
    mutation UnlikeReview($reviewId: String!) {
        unlikeReview(reviewId: $reviewId) {
            id
        }
    }
`;
