import { combineReducers } from 'redux';
import generalReducer from './generalSlice';
import userReducer from '../features/Auth/userSlice';

const rootReducer = combineReducers({
    // define your reducers here
    general: generalReducer,
    user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
