import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GRAPHQL_API } from './constants';
import store from '../store';

const httpLink = createHttpLink({
    uri: GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
    const userState = store.getState().user;
    console.log(userState);
    return {
        headers: {
            ...headers,
            Authorization: userState.isLoggedIn ? `JWT ${userState.token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

export default client;
