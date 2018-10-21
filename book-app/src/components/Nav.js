/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import logo from '../logo.svg';

class Nav extends Component {

    state = {}
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable>
                
                <Menu.Item>
                    <img className="App-logo" src={logo} alt="BeezyBook" width="200" height="200" />
                </Menu.Item>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'>
                    HOME
                </Menu.Item>
                <Menu.Item name='library' active={activeItem === 'library'} onClick={this.handleItemClick} as={Link} to='/library'>
                    BOOKS
                </Menu.Item>
                <Menu.Item name='genres' active={activeItem === 'genres'} onClick={this.handleItemClick} as={Link} to='/genres'>
                    GENRES
                </Menu.Item>
            </Menu>
        )
    }
}

export default Nav;