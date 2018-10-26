import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Reducer from './Reducer';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Books from './pages/Books';


import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Genres from './pages/Genres';


const store = createStore(
  Reducer,
  //persistedStore,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// App would be the equivalent to a Routes.js file here

class App extends Component {
  constructor(p) {
    super(p);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route exact path="/" component={Home} />
              <Route exact path="/library" component={Books} />
              <Route exact path="/genres" component={Genres} />
              {/* <Route path="/book/:id" component={Detail}/>   */}
            </Layout>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;