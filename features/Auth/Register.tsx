import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import {
    emailValidator,
    nameValidator,
    passwordValidator,
    phoneValidator,
} from '../../utils/validators';
import styles from './styles';
import * as api from './api';
import { authClear, setToken } from './userSlice';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    interface inputObj {
        value: string;
        error: string;
    }

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<inputObj>({ value: '', error: '' });
    const [name, setName] = useState<inputObj>({ value: '', error: '' });
    const [phn, setPhn] = useState<inputObj>({ value: '', error: '' });
    const [password, setPassword] = useState<inputObj>({
        value: '',
        error: '',
    });
    const [password2, setPassword2] = useState<inputObj>({
        value: '',
        error: '',
    });

    const dispatch = useDispatch();
    const [register] = useMutation(api.REGISTER);
    const [login] = useMutation(api.LOGIN);

    const onRegisterPressed = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const nameError = nameValidator(name.value);
        const phnError = phoneValidator(phn.value);
        let password2Error = '';

        if (password.value !== password2.value) {
            password2Error = 'Passwords dont match!!';
        }

        if (
            !!emailError ||
            !!passwordError ||
            !!nameError ||
            !!phnError ||
            !!password2Error
        ) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setName({ ...name, error: nameError });
            setPhn({ ...phn, error: phnError });
            setPassword2({ ...password2, error: password2Error });
            return;
        }

        // First add the user and then login
        try {
            setLoading(true);
            await register({
                variables: {
                    email: email.value,
                    password: password.value,
                    phone: phn.value,
                    name: name.value,
                },
            });
            const res = await login({
                variables: { email: email.value, password: password.value },
            });
            const {
                token,
                payload: { email: _email },
            } = res.data.tokenAuth;
            dispatch(setToken({ token, email: _email }));
        } catch (err) {
            // TODO: Flash error
            console.error(err);
            dispatch(authClear());
        } finally {
            setLoading(false);
            // TODO: navigate to home screen
        }
    };

    return (
        <View style={styles.container}>
            <Header>Register</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                onChangeText={text => setName({ value: text, error: '' })}
                value={name.value}
                error={!!name.error}
                errorText={name.error}
                focusable
                dense
            />

            <TextInput
                label="Email"
                returnKeyType="next"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                focusable
                dense
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
            />
            <TextInput
                label="Phone"
                returnKeyType="next"
                value={phn.value}
                error={!!phn.error}
                errorText={phn.error}
                onChangeText={text => setPhn({ value: text, error: '' })}
                dense
                keyboardType="phone-pad"
                focusable
            />

            <TextInput
                label="Password"
                returnKeyType="next"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                secureTextEntry
                dense
                focusable
            />
            <TextInput
                label="Confirm Password"
                returnKeyType="done"
                value={password2.value}
                onChangeText={text => setPassword2({ value: text, error: '' })}
                error={!!password2.error}
                secureTextEntry
                dense
                focusable
            />

            <Button
                mode="contained"
                style={styles.btn}
                focusable
                onPress={onRegisterPressed}
                loading={loading}
            >
                Register
            </Button>
        </View>
    );
};

export default Register;
