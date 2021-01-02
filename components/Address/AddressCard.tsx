import React from 'react';
import { Caption, Card, List, Title } from 'react-native-paper';
import { Address } from '../../utils/types';
import styles from './styles';

type AddressCardProps = {
    address: Address;
};

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    return (
        <Card elevation={3} focusable style={styles.card}>
            <Card.Content>
                <Title>{address.name}</Title>
                <Caption>
                    <List.Item title={address.address1}></List.Item>
                    <List.Item title={address.address2}></List.Item>
                    <List.Item
                        title={`${address.city}, ${address.state} ${address.pincode}`}
                    ></List.Item>
                    <List.Item title={address.country}></List.Item>
                </Caption>
            </Card.Content>
        </Card>
    );
};

export default AddressCard;

/*
    NAME
    ADD1
    ADD2
    city, state pincode
    country

*/
