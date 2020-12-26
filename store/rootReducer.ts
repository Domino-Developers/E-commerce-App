import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    // define your reducers here
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
