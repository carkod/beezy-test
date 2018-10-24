import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Books from './Books';
import configureStore from 'redux-mock-store'


it('renders Book page', () => {
    // create any initial state needed
    const initialState = {
        books: []
    };
    // here it is possible to pass in any middleware if needed into //configureStore
    const mockStore = configureStore();
    const store = mockStore(initialState)
    shallow(<Books store={store} />);

});