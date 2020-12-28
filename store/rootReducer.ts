import { combineReducers } from 'redux';
import generalReducer from './generalSlice';

const rootReducer = combineReducers({
    // define your reducers here
    general: generalReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
