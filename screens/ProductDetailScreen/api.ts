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
    mutation($productId: String!, $rating: Int!, $text: String!) {
        addReview(productId: $productId, rating: $rating, text: $text) {
            id
            rating
            text
        }
    }
`;
