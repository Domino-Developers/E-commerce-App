import { gql } from '@apollo/client';

export const GET_USERDATA = gql`
    query {
        me {
            name
        }
    }
`;
