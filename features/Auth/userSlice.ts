import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { removeData } from './storeData';
export interface userState {
    token: string;
    isLoggedIn: boolean;
    email: string;
}

const initialState: userState = {
    token: '',
    isLoggedIn: false,
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (
            state,
            action: PayloadAction<{ token: string; email: string }>
        ) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        authClear: state => {
            state.isLoggedIn = false;
            state.token = '';
            state.email = '';
            removeData();
        },
    },
});

export default userSlice.reducer;

export const { setToken, authClear } = userSlice.actions;
