/* eslint-disable */
import { environment } from '../environment/environment';

export const SET_BOOKS  = 'SET_BOOKS';
export const SET_SINGLE_BOOK  = 'SET_SINGLE_BOOK';

async function handleResponse (response) {
    console.log(response);
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setFormFields (data) {
    return {
        type: SET_FIELDS,
        data
    }
}

export function setbooks(data) {
    return {
        type: SET_BOOKS,
        data
    }
}

export function setSingleBook(data) {
    return {
        type: SET_SINGLE_BOOK,
        data
    }
}

export function deleteBook(id) {
    return dispatch => {
        return fetch(`${environment.host}/books/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => {
            dispatch(cvDeleted(id))
        });   
    }
}

export function createBook(data) {
    return dispatch => {
        return fetch(`${environment.host}/books`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json",
           }
        })
        .then(handleResponse).then(data => dispatch(addCV(data)));   
        
    }
}

export function fetchBooksApi() {
    return dispatch => {
        fetch(`${environment.host}/books`, {
            method:'GET',
            headers : { 
            "Content-Type": "application/json",
           },
        })
        .then(handleResponse)
        .then(data => dispatch(setbooks(data)))
    }
}

export function fetchBookApi(id) {
    return dispatch => {
        fetch(`${environment.host}/books/${id}`, {
            method:'GET',
            headers : { 
            "Content-Type": "application/json",
           },
        })
        .then(handleResponse)
        .then(data => {
            dispatch(setSingleBook(data))})
    }
}