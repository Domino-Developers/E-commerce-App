import { useTheme, Text } from 'react-native-paper';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return <Text style={styles.header}>{children}</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default memo(Header);
