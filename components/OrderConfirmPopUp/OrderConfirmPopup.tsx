import React from 'react';
import { Portal, Dialog, Button, Text, useTheme } from 'react-native-paper';

interface OrderConfirmPopupProps {
    visible: boolean;
    setVisible: (a: boolean) => void;
    onOrder: () => void;
}

const OrderConfirmPopup: React.FC<OrderConfirmPopupProps> = ({
    visible,
    setVisible,
    onOrder,
}) => {
    const { colors } = useTheme();
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>Confirm Order</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure to order ?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        focusable
                        onPress={() => setVisible(false)}
                        color={colors.error}
                    >
                        Cancel
                    </Button>
                    <Button
                        focusable
                        onPress={() => {
                            setVisible(false);
                            onOrder();
                        }}
                        color={colors.success}
                    >
                        Confirm
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default OrderConfirmPopup;
