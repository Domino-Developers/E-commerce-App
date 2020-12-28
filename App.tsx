import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import store from './store';
import MainNavigation from './navigation';
import { DarkTheme, DefaultTheme } from './utils/themes';
import { useTypedSelector } from './utils/hooks';

export default function App() {
    const darkTheme = useTypedSelector(state => state.general.darkTheme);

    const theme = darkTheme ? DarkTheme : DefaultTheme;
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
                    <MainNavigation />
                </NavigationContainer>
            </PaperProvider>
        </StoreProvider>
    );
}
