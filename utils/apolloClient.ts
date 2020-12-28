import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API } from './constants';

const client = new ApolloClient({
    uri: GRAPHQL_API,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

export default client;
