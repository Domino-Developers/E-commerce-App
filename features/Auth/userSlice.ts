import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userState {
    token: string;
    isLoggedIn: boolean;
}

const initialState: userState = {
    token: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        authClear: state => {
            state.isLoggedIn = false;
            state.token = '';
        },
    },
});

export default userSlice.reducer;

export const { setToken, authClear } = userSlice.actions;
