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
                    id
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
