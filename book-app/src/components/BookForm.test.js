import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import BookForm from './BookForm';
import configureStore from 'redux-mock-store'


it('renders Book page', () => {
    // create any initial state needed
    const initialState = {
        genres: []
    };
    // here it is possible to pass in any middleware if needed into //configureStore
    const mockStore = configureStore();
    const store = mockStore(initialState)
    shallow(<BookForm store={store} />);

});