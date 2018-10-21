/* eslint-disable */
import { environment } from '../environment/environment';
import { DELETE_BOOK, CREATE_BOOK, SET_BOOKS, SET_SINGLE_BOOK } from './constants';

async function handleResponse (response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function bookCreated (data) {
    return {
        type: CREATE_BOOK,
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

export function bookDeleted(id) {
    return {
        type: DELETE_BOOK,
        id
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
        .then(data => dispatch(bookDeleted(id)));   
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
        .then(handleResponse).then(data => dispatch(bookCreated(data)));   
        
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
        .then(data => dispatch(setSingleBook(data)))
    }
}