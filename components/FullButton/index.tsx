import React from 'react';
import { Button } from 'react-native-paper';
import styles from './styles';

type FullButtonProps = React.ComponentProps<typeof Button>;

const FullButton: React.FC<FullButtonProps> = ({
    style,
    children,
    focusable,
    ...props
}) => {
    return (
        <Button
            mode="contained"
            style={[styles.btn, style]}
            focusable
            {...props}
        >
            {children}
        </Button>
    );
};

export default FullButton;
