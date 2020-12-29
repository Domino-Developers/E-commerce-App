import { useTheme } from 'react-native-paper';
import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { color } from 'react-native-reanimated';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ children }) => {
    const { colors } = useTheme();
    return (
        <Text style={[styles.header, { color: colors.text }]}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default memo(Header);
