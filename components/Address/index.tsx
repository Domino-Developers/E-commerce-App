import React from 'react';
import { Address } from '../../utils/types';
import { View, Text, ScrollView } from 'react-native';
import Header from '../Header';
import AddressCard from './AddressCard';

interface AddressContainerProps {
    addresses: Address[];
}

const AddressContainer: React.FC<AddressContainerProps> = ({ addresses }) => {
    return (
        <View>
            <Header>Start</Header>
            <ScrollView horizontal style={{ margin: 20, borderColor: 'black' }}>
                {/* {addresses.map((address, i) => (
                    <AddressCard address={address} key={i} />
                ))} */}
                {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                ].map(i => (
                    <AddressCard key={i} address={addresses[0]} />
                ))}
            </ScrollView>
            <Header>End</Header>
        </View>
    );
};

export default AddressContainer;
