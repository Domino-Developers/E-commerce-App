import { combineReducers } from 'redux';
import generalReducer from './generalSlice';
import userReducer from '../features/Auth/userSlice';
import alertsReducer from '../features/Alerts/alertSlice';

const rootReducer = combineReducers({
    // define your reducers here
    general: generalReducer,
    user: userReducer,
    alerts: alertsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
