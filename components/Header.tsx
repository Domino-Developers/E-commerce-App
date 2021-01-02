import { useTheme, Text } from 'react-native-paper';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

type HeaderProps = React.ComponentProps<typeof Text>;

const Header: React.FC<HeaderProps> = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.header, style]} {...props}>
            {children}
        </Text>
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
