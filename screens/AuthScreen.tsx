import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Text } from 'react-native-paper';

import Login from '../features/Auth/Login';
import Register from '../features/Auth/Register';
import { AccountNavProps } from '../navigation/ParamList';

import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';

const AuthScreen: React.FC<AccountNavProps<'Auth'>> = ({ navigation }) => {
    const [loginView, setLoginView] = useState<boolean>(true);
    const theme = useTheme();
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            {loginView ? <Login /> : <Register />}
            <View style={styles.bottomContainer}>
                <Text style={{ color: theme.colors.backdrop }}>
                    {loginView
                        ? 'Dont have an account?'
                        : 'Already have an account?'}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.setOptions({
                            title: !loginView ? 'Login' : 'Register',
                        });

                        setLoginView(!loginView);
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.primary,
                            fontWeight: 'bold',
                        }}
                    >
                        {' '}
                        {loginView ? 'Sign Up' : 'Sign In'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        marginTop: 20,
    },
});

export default AuthScreen;
