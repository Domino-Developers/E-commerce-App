import React from 'react';
import { Snackbar, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../utils/hooks';
import { removeAlert } from './alertSlice';

interface AlertBarProps {}

const AlertBar: React.FC<AlertBarProps> = ({}) => {
    const alertState = useTypedSelector(state => state.alerts);
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const onDismiss = () => {
        dispatch(removeAlert());
    };

    return (
        <Snackbar
            visible={alertState.visible}
            onDismiss={onDismiss}
            focusable
            style={{
                backgroundColor:
                    alertState.type == 'success'
                        ? colors.success
                        : colors.error,
            }}
        >
            {alertState.text}
        </Snackbar>
    );
};

export default AlertBar;
