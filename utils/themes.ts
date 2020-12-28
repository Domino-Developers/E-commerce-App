import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native';

import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const DefaultTheme = {
    ...NavDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavDefaultTheme.colors,
    },
};

export const DarkTheme = {
    ...NavDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavDarkTheme.colors,
        ...PaperDarkTheme.colors,
    },
};
