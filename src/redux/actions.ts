import { Person } from './reducers';
import peopleData from '../utils/leaderboard.json';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_PEOPLE = 'SET_PEOPLE';

interface SetUsernameAction {
    type: typeof SET_USERNAME;
    payload: string;
}

interface SetPeopleAction {
    type: typeof SET_PEOPLE;
    payload: Person[];
}

export type UserActionTypes = SetUsernameAction | SetPeopleAction;

export const setUsername = (username: string): UserActionTypes => ({
    type: SET_USERNAME,
    payload: username
});

export const setPeople = (people: Person[]): UserActionTypes => ({
    type: SET_PEOPLE,
    payload: people
});

// Convert peopleData to an array of Person objects
const convertedPeopleData = Object.values(peopleData);

// Dispatch initial data
export const initializePeople = () => setPeople(convertedPeopleData);
