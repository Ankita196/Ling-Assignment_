import { userReducer, UserState, Person } from '../reducers';
import { SET_USERNAME, SET_PEOPLE, UserActionTypes } from '../actions';

describe('userReducer', () => {
    const initialState: UserState = {
        username: '',
        people: []
    };

    it('should return the initial state', () => {
        // Creating a dummy action that satisfies UserActionTypes
        const dummyAction: UserActionTypes = { type: 'UNKNOWN_ACTION' as any, payload: '' as any };
        expect(userReducer(undefined, dummyAction)).toEqual(initialState);
    });

    it('should handle SET_USERNAME', () => {
        const username = 'John';
        const action: UserActionTypes = { type: SET_USERNAME, payload: username };
        const expectedState = { ...initialState, username };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_PEOPLE', () => {
        const people: Person[] = [
            { name: 'Alice', bananas: 100, "uid": "00D1LA8puAa1GINkVpfgC1TmO0m1" },
            { name: 'Bob', bananas: 90, "uid": "x8RNvUgv5pZqDVatEXb2aYgSflq1" },
        ];
        const action: UserActionTypes = { type: SET_PEOPLE, payload: people };
        const expectedState = { ...initialState, people };

        expect(userReducer(initialState, action)).toEqual(expectedState);
    });
});
