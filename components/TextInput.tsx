import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as Input, useTheme, Text } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & {
    errorText?: string;
    leftIcon?: {
        name: string;
        color?: string;
    };
};

const TextInput = function ({ errorText, leftIcon, ...props }: Props) {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <Input
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                left={
                    leftIcon && (
                        <Input.Icon
                            name={leftIcon.name}
                            color={
                                leftIcon.color
                                    ? leftIcon.color
                                    : theme.colors.primary
                            }
                        />
                    )
                }
                {...props}
            />
            {errorText ? (
                <Text style={[styles.error, { color: theme.colors.error }]}>
                    {errorText}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 3,
    },
    error: {
        fontSize: 14,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default TextInput;
