/* eslint-disable */

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Nav from '../components/Nav';
import 'semantic-ui-css/semantic.min.css';


class Layout extends Component {

  state = {
    navVisible: true,
  }

  navVisibility = () => {
    this.setState({ navVisible: !this.state.navVisible })
  }

  render() {

    return (
      <div className="layout">
          <Nav />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (s, p) => {
  const newObj = Object.assign({}, p, s)
  return newObj
}

export default Layout;