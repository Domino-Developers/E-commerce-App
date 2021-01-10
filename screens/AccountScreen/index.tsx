import { useMutation, useQuery } from '@apollo/client';
import React, { useState, Fragment, useEffect } from 'react';
import { View, StyleProp, TextStyle } from 'react-native';
import {
    Text,
    ActivityIndicator,
    List,
    Divider,
    useTheme,
    Surface,
    FAB,
} from 'react-native-paper';

import { AccountNavProps } from '../../navigation/ParamList';
import { useAlert } from '../../utils/hooks';
import Header from '../../components/Header';
import styles from './styles';
import * as api from './api';
import { User } from '../../utils/types';
import AddressContainer from '../../components/Address';
import TextInput from '../../components/TextInput';
import { nameValidator, phoneValidator } from '../../utils/validators';

const AccountScreen: React.FC<AccountNavProps<'Account'>> = () => {
    const { data, loading: fetchLoading, error } = useQuery(api.GET_USERDATA);
    const [updateUserData, { loading: updateLoading }] = useMutation(
        api.SET_USERDATA
    );
    const setAlert = useAlert();
    const { colors } = useTheme();
    const [editing, setEditing] = useState(false);
    const [phone, setPhone] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });

    useEffect(() => {
        if (data && !fetchLoading && !error) {
            setPhone({ value: data.me.phone, error: '' });
            setName({ value: data.me.name, error: '' });
        }
        if (error) {
            setAlert({
                text: 'Some error occured! Please try again',
                type: 'danger',
            });
        }
    }, [data, fetchLoading, error]);

    if (fetchLoading || updateLoading) {
        return (
            <ActivityIndicator
                focusable
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
                size="large"
            ></ActivityIndicator>
        );
    }

    if (error) {
        console.log(error);
        return <Text>Sorry some error occured!!</Text>;
    }

    let _data: User = data.me;

    const onSave = async () => {
        const nameError = nameValidator(name.value);
        const phnError = phoneValidator(phone.value);

        if (nameError || phnError) {
            setName({ ...name, error: nameError });
            setPhone({ ...phone, error: phnError });
            return;
        }

        try {
            await updateUserData({
                variables: { name: name.value, phone: phone.value },
            });
            setEditing(false);
        } catch (err) {
            console.error(err.graphQLErrors);
            setAlert({
                text: err.graphQLErrors[0].message,
                type: 'danger',
            });
        }
    };

    return (
        <View style={styles.page}>
            {editing ? (
                <TextInput
                    style={styles.headerInput}
                    value={name.value}
                    error={!!name.error}
                    errorText={name.error}
                    returnKeyType="next"
                    onChangeText={text => setName({ value: text, error: '' })}
                    focusable
                    label="Name"
                />
            ) : (
                <Header style={styles.name}>{_data.name}</Header>
            )}
            <Surface
                focusable
                style={[
                    {
                        backgroundColor: colors.surface,
                    },
                    styles.profileData,
                ]}
            >
                {editing ? (
                    <Fragment>
                        <TextInput
                            focusable
                            label="Email"
                            returnKeyType="next"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            disabled
                            leftIcon={{ name: 'email' }}
                            style={styles.textInput}
                            value={_data.email}
                        />
                        <Divider focusable />
                        <TextInput
                            label="Phone"
                            returnKeyType="next"
                            leftIcon={{ name: 'phone' }}
                            value={phone.value}
                            error={!!phone.error}
                            errorText={phone.error}
                            onChangeText={text =>
                                setPhone({ value: text, error: '' })
                            }
                            keyboardType="phone-pad"
                            focusable
                            style={[
                                styles.textInput,
                                { backgroundColor: colors.surface },
                            ]}
                        />
                        <Divider focusable />
                    </Fragment>
                ) : (
                    <Fragment>
                        <List.Item
                            title="Email"
                            description={_data.email}
                            left={props => (
                                <List.Icon
                                    icon="email"
                                    {...props}
                                    color={colors.primary}
                                />
                            )}
                        />
                        <Divider focusable />
                        <List.Item
                            title="Phone"
                            description={_data.phone}
                            left={props => (
                                <List.Icon
                                    icon="phone"
                                    {...props}
                                    color={colors.primary}
                                />
                            )}
                        />
                        <Divider focusable />
                        {/* <AddressContainer addresses={_data.addressSet} /> */}
                    </Fragment>
                )}
            </Surface>
            <FAB
                style={styles.fab}
                focusable
                icon={editing ? 'check' : 'pencil'}
                onPress={() => {
                    if (editing) {
                        onSave();
                    } else {
                        setEditing(true);
                    }
                }}
            />
        </View>
    );
};

export default AccountScreen;
