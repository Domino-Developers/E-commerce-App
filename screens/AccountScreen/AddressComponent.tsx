import React, { useState, Fragment } from 'react';
import { List, Divider, useTheme, Surface, Caption } from 'react-native-paper';

import styles from './styles';
import TextInput from '../../components/TextInput';

interface Address {
    name: { value: string; error: string };
    phone: { value: string; error: string };
    address1: { value: string; error: string };
    address2: { value: string; error: string };
    pincode: { value: number; error: string };
    city: { value: string; error: string };
    state: { value: string; error: string };
}

interface Props {
    address: Address;
    setAddress: (newAddress: Address) => void;
    editing: boolean;
}

const AddressComponent: React.FC<Props> = ({
    address,
    setAddress,
    editing,
}) => {
    const { colors } = useTheme();

    return (
        <Surface
            focusable
            style={[{ backgroundColor: colors.surface }, styles.profileData]}
        >
            <Caption style={styles.textInput}>Billing Address</Caption>

            {editing ? (
                <Fragment>
                    <TextInput
                        label="Name"
                        returnKeyType="next"
                        leftIcon={{ name: 'account' }}
                        value={address.name.value}
                        error={!!address.name.error}
                        errorText={address.name.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                name: { value: text, error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        keyboardType="phone-pad"
                        label="Phone"
                        returnKeyType="next"
                        leftIcon={{ name: 'phone' }}
                        value={address.phone.value}
                        error={!!address.phone.error}
                        errorText={address.phone.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                phone: { value: text, error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        label="Address Line 1"
                        returnKeyType="next"
                        leftIcon={{ name: 'map-marker' }}
                        value={address.address1.value}
                        error={!!address.address1.error}
                        errorText={address.address1.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                address1: { value: text, error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        label="Address Line 2"
                        returnKeyType="next"
                        leftIcon={{ name: 'map-marker' }}
                        value={address.address2.value}
                        error={!!address.address2.error}
                        errorText={address.address2.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                address2: { value: text, error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        label="City"
                        returnKeyType="next"
                        leftIcon={{ name: 'city' }}
                        value={address.city.value}
                        error={!!address.city.error}
                        errorText={address.city.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                city: { value: text, error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        keyboardType="phone-pad"
                        label="Pincode"
                        returnKeyType="next"
                        leftIcon={{ name: 'pin' }}
                        value={String(address.pincode.value)}
                        error={!!address.pincode.error}
                        errorText={address.pincode.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                pincode: { value: Number(text), error: '' },
                            })
                        }
                        focusable
                        style={[
                            styles.textInput,
                            { backgroundColor: colors.surface },
                        ]}
                    />
                    <Divider focusable />
                    <TextInput
                        label="State"
                        returnKeyType="next"
                        leftIcon={{ name: 'home-group' }}
                        value={address.state.value}
                        error={!!address.state.error}
                        errorText={address.state.error}
                        onChangeText={text =>
                            setAddress({
                                ...address,
                                state: { value: text, error: '' },
                            })
                        }
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
                        title="Name"
                        description={address.name.value}
                        left={props => (
                            <List.Icon
                                icon="account"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="Phone"
                        description={address.phone.value}
                        left={props => (
                            <List.Icon
                                icon="phone"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="Address Line 1"
                        description={address.address1.value}
                        left={props => (
                            <List.Icon
                                icon="map-marker"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="Address Line 2"
                        description={address.address2.value}
                        left={props => (
                            <List.Icon
                                icon="map-marker"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="City"
                        description={address.city.value}
                        left={props => (
                            <List.Icon
                                icon="city"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="Pincode"
                        description={address.pincode.value}
                        left={props => (
                            <List.Icon
                                icon="pin"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                    <List.Item
                        title="State"
                        description={address.state.value}
                        left={props => (
                            <List.Icon
                                icon="home-group"
                                {...props}
                                color={colors.primary}
                            />
                        )}
                    />
                    <Divider focusable />
                </Fragment>
            )}
        </Surface>
    );
};

export default AddressComponent;
