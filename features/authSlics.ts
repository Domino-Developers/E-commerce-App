import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userState {
    token: string;
    isLoggedIn: boolean;
    name: string;
    phone: string;
    email: string;
}

const initialState: userState = {
    token: '',
    isLoggedIn: false,
    name: '',
    phone: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        authClear: (state, _) => {
            state.isLoggedIn = false;
            state.token = '';
            state.name = '';
            state.phone = '';
            state.email = '';
        },
    },
});

export default userSlice.reducer;

export const { setToken, authClear } = userSlice.actions;
