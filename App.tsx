import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import store from './store';
import client from './utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import Main from './app/Main';

export default function App() {
    return (
        <StoreProvider store={store}>
            <ApolloProvider client={client}>
                <Main />
            </ApolloProvider>
        </StoreProvider>
    );
}
