import { gql } from '@apollo/client';

export const GET_CART = gql`
    query {
        me {
            id
            cart {
                id
                product {
                    id
                    name
                    photos {
                        url
                    }
                    price
                    discount
                    stock
                }
                qty
            }
        }
    }
`;

export const SET_QUANTITY = gql`
    mutation SetQuantity($productId: String!, $qty: Int!) {
        setCart(cartObj: { productId: $productId, qty: $qty }) {
            cart {
                id
                qty
            }
        }
    }
`;

export const ORDER = gql`
    mutation addOrder($addressId: String!) {
        orderCart(addressId: $addressId) {
            order {
                id
            }
        }
    }
`;
