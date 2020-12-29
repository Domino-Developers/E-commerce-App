import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import styles from './styles';
import { emailValidator, passwordValidator } from '../../utils/validators';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    interface inputObj {
        value: string;
        error: string;
    }

    const [email, setEmail] = useState<inputObj>({ value: '', error: '' });
    const [password, setPassword] = useState<inputObj>({
        value: '',
        error: '',
    });

    const onLogin = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (!!emailError || !!passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }
        // TODO: Integrate login
        console.log(email, password);
    };

    return (
        <View style={styles.container}>
            <Header>Welcome Back!</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                focusable
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                dense
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                secureTextEntry
                focusable
                errorText={password.error}
                dense
            />
            <Button
                mode="contained"
                style={styles.btn}
                focusable
                onPress={onLogin}
            >
                Login
            </Button>
        </View>
    );
};

export default Login;
