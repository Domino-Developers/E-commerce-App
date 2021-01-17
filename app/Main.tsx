import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from '../navigation';
import { DarkTheme, DefaultTheme } from '../utils/themes';
import { useTypedSelector } from '../utils/hooks';
import AlertBar from '../features/Alerts';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../features/Auth/userSlice';

export default function Main() {
    const darkTheme = useTypedSelector(state => state.general.darkTheme);
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            try {
                const dataString = await AsyncStorage.getItem('DD-E-commerce');
                console.log(dataString);
                if (dataString) {
                    const data = JSON.parse(dataString);
                    dispatch(setToken(data));
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        getData();
    });
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
