import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeneralState = { darkTheme: boolean };

const initialState: GeneralState = { darkTheme: false };

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<boolean>) => {
            state.darkTheme = action.payload;
        },
    },
});

const { changeTheme } = generalSlice.actions;

export default generalSlice.reducer;

export { changeTheme };
