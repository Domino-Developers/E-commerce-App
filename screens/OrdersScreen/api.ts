
import {gql} from '@apollo/client';

export const GET_ORDERS = gql`
    query {
        orders {
            id
            status
            productObjects {
                product {
                    id
                    name
                    photos {
                        url
                    }
                }
                qty
            }
        }
    }
`