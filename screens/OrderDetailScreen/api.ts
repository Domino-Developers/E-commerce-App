import {gql} from '@apollo/client';

export const GET_ORDER = gql`
    query Order($orderId: String!) {
        order(id: $orderId) {
            id
            orderTimestamp
            status
            name
            phone
            address1
            address2
            pincode
            city
            state
            productObjects {
                product {
                    id
                    name
                    photos {
                        url
                    }
                }
                qty
                price
            }
        }
    }
`