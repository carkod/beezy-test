/* eslint-disable */
import { environment } from '../environment/environment';
import { SET_GENRES, SET_SINGLE_GENRE, CREATE_GENRE, DELETE_GENRE } from './constants';


function handleResponse (response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setgenres(data) {
    return {
        type: SET_GENRES,
        data
    }
}

export function setSingleBook(data) {
    return {
        type: SET_SINGLE_GENRE,
        data
    }
}

export function genreDeleted(id) {
    return {
        type: DELETE_GENRE,
        id
    }
}

export function genreCreated(data) {
    return {
        type: CREATE_GENRE,
        data
    }
}

export function deleteGenre(id) {
    return dispatch => {
        return fetch(`${environment.host}/genres/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => dispatch(genreDeleted(id)));   
    }
}

export function createGenre(data) {
    return dispatch => {
        return fetch(`${environment.host}/genres`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json",
           }
        })
        .then(handleResponse).then(data => dispatch(genreCreated(data)));   
        
    }
}

export function fetchGenresApi() {
    return dispatch => {
        fetch(`${environment.host}/genres`, {
            method:'GET',
            headers : { 
            "Content-Type": "application/json",
           },
        })
        .then(handleResponse)
        .then(data => {
            dispatch(setgenres(data));
        })
    }
}

export function fetchGenreApi(id) {
    return dispatch => {
        fetch(`${environment.host}/genres/${id}`)
        .then(handleResponse)
        .then(data => dispatch(setgenres(data)))
    }
}