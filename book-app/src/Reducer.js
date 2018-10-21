/* eslint-disable */

import { combineReducers } from 'redux';

import { SET_SINGLE_BOOK, SET_BOOKS, SET_SINGLE_GENRE, SET_GENRES, DELETE_BOOK, DELETE_GENRE, UPDATE_BOOK, UPDATE_GENRE } from './actions/constants';

function books(state = [], action = {}) {
    switch (action.type) {
        case SET_BOOKS:
            const combined = [...action.data];
            return combined;
        case SET_SINGLE_BOOK:
            return state;
        case DELETE_BOOK:
            return [...action.data];
        case UPDATE_BOOK:
            return [...action.data];
        default:
            return state;
    }
}

const genres = (state = [], action = {}) => {
    switch (action.type) {
        case SET_GENRES:
            const combined = [...action.data];
            return combined;
        case SET_SINGLE_GENRE:
            return state;
        case DELETE_GENRE:
            return [...action.data];
        case UPDATE_GENRE:
            return [...action.data];
        default:
            return state
    }
}

export default combineReducers({ books, genres });

