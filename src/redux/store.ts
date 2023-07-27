import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { notesReducer } from './notes/notesReducer';
import { tagsReducer } from './tags/tagsReducer';

const rootReducer = combineReducers({
    note: notesReducer,
    tag: tagsReducer
});

function saveToLocalStorage(state: any) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}

function loadFromLocalStorage() {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
        return undefined
    }
    return JSON.parse(serializedState);
}

const presistedState = loadFromLocalStorage();

export const store = createStore(
    rootReducer,
    presistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));