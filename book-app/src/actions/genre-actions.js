/* eslint-disable */
import { environment } from '../environment/environment';

export const SET_GENRES  = 'SET_GENRES';
export const SET_SINGLE_GENRE  = 'SET_SINGLE_GENRE';

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
        type: CV_DELETED,
        id
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
        .then(data => dispatch(cvDeleted(id)));   
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
        .then(handleResponse).then(data => dispatch(addCV(data)));   
        
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