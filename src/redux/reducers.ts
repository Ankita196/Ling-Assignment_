import { SET_USERNAME, SET_PEOPLE, UserActionTypes } from './actions';

export interface Person {
    uid: string;
    name: string;
    bananas: number;
}

export interface UserState {
    username: string;
    people: Person[];
}

const initialState: UserState = {
    username: '',
    people: []
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.payload };
        case SET_PEOPLE:
            return { ...state, people: action.payload };
        default:
            return state;
    }
};
