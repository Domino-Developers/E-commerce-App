import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from '../navigation';
import { DarkTheme, DefaultTheme } from '../utils/themes';
import { useTypedSelector } from '../utils/hooks';
import AlertBar from '../features/Alerts';

export default function Main() {
    const darkTheme = useTypedSelector(state => state.general.darkTheme);

    const theme = darkTheme ? DarkTheme : DefaultTheme;
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <MainNavigation />
                <AlertBar />
            </NavigationContainer>
        </PaperProvider>
    );
}
