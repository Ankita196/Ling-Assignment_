import { combineReducers, createStore } from 'redux';
import { userReducer, UserState } from './reducers';

export const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here if you have more
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
