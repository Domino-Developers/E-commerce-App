import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
            payload
        }
    }
`;

export const REGISTER = gql`
    mutation Register(
        $email: String!
        $password: String!
        $phone: String!
        $name: String!
    ) {
        createUser(
            name: $name
            email: $email
            phone: $phone
            password: $password
        ) {
            id
        }
    }
`;
