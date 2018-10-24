/* eslint-disable */

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import Notification from '../components/Notification';
import 'semantic-ui-css/semantic.min.css';


class Layout extends Component {

  state = {
    navVisible: true,
    notification: {
      messageOpen: false,
      messageText: '',
    }
  }

  navVisibility = () => {
    this.setState({ navVisible: !this.state.navVisible })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification !== this.props.notification) {
      this.setState({ notification: this.props.notification })
    }
  }

  render() {
    return (
      <div className="layout">
      {console.log(this.state.notification)}
          <Notification open={this.state.notification.messageOpen} text={this.state.notification.messageText}/>
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

export default connect(mapStateToProps, {})(Layout);
