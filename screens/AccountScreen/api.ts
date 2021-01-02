import { gql } from '@apollo/client';

export const GET_USERDATA = gql`
    query {
        me {
            id
            name
            email
            phone
            addressSet {
                name
                address1
                address2
                pincode
                city
                state
                country
            }
        }
    }
`;

export const SET_USERDATA = gql`
    mutation UpdateMe($name: String!, $phone: String!) {
        updateMe(name: $name, phone: $phone) {
            user {
                id
                name
                phone
            }
        }
    }
`;
