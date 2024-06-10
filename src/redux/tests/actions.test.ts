import { setUsername, setPeople, SET_USERNAME, SET_PEOPLE } from '../actions';
import { Person } from '../reducers';

describe('actions', () => {
    it('should create an action to set the username', () => {
        const username = 'John';
        const expectedAction = {
            type: SET_USERNAME,
            payload: username
        };
        expect(setUsername(username)).toEqual(expectedAction);
    });

    it('should create an action to set people', () => {
        const people: Person[] = [
            { name: 'Alice', bananas: 100, "uid": "00D1LA8puAa1GINkVpfgC1TmO0m1" },
            { name: 'Bob', bananas: 90, "uid": "x8RNvUgv5pZqDVatEXb2aYgSflq1" },
        ];
        const expectedAction = {
            type: SET_PEOPLE,
            payload: people
        };
        expect(setPeople(people)).toEqual(expectedAction);
    });
});
