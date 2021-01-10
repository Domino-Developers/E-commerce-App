import {
    DarkTheme as NavDarkTheme,
    DefaultTheme as NavDefaultTheme,
} from '@react-navigation/native';

import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            success: string;
        }
    }
}

export const DefaultTheme: ReactNativePaper.Theme = {
    ...NavDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavDefaultTheme.colors,
        success: '#28a745',
        background: '#fff',
    },
    roundness: 10,
};

export const DarkTheme: ReactNativePaper.Theme = {
    ...NavDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavDarkTheme.colors,
        ...PaperDarkTheme.colors,
        success: '#28a745',
    },
    roundness: 10,
};
