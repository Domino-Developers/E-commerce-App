import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

interface FullPageLoadingProps {}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({}) => {
    return (
        <ActivityIndicator
            focusable
            style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
            }}
            size="large"
        />
    );
};

export default FullPageLoading;
