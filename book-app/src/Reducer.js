/* eslint-disable */

import { combineReducers } from 'redux';

import { SET_SINGLE_BOOK, SET_BOOKS, SET_SINGLE_GENRE, SET_GENRES } from './actions/constants';

function books(state = [], action = {}) {
    switch (action.type) {
        case SET_BOOKS:
            const combined = [...action.data];
            return combined;
        case SET_SINGLE_BOOK:
            return state;
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
        default:
            return state
    }
}

export default combineReducers({ books, genres });

