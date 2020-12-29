import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native';

import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const BaseTheme = {
    roundness: 5,
};

export const DefaultTheme = {
    ...NavDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavDefaultTheme.colors,
    },
    ...BaseTheme,
};

export const DarkTheme = {
    ...NavDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavDarkTheme.colors,
        ...PaperDarkTheme.colors,
    },
    ...BaseTheme
};
