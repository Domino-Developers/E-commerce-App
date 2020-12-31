import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { Alert, showAlert, removeAlert } from '../features/Alerts/alertSlice';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAlert = () => {
    const dispatch = useDispatch();

    const setAlert = (alert: Alert) => {
        dispatch(removeAlert);
        dispatch(showAlert(alert));
    };

    return setAlert;
};
