import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type alertType = 'danger' | 'success';
export type Alert = {
    text: string;
    type: alertType;
};

type AlertState = {
    visible: boolean;
} & Alert;

const initialState: AlertState = {
    visible: false,
    text: '',
    type: 'danger',
};

const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<Alert>) => {
            state.visible = true;
            state.type = action.payload.type;
            state.text = action.payload.text;
        },
        removeAlert: state => {
            state.visible = false;
            state.text = '';
        },
    },
});

const { showAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
export { showAlert, removeAlert };
