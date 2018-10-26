/* eslint-disable */

import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchGenresApi } from '../actions/genre-actions';

class FilterGenres extends Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount = () => {
        this.props.fetchGenresApi();
    }

    handleChange = (e, { value }) => {
        this.setState({ value });
        this.props.updateListing(value);
    }

    render() {
        return (
            <Dropdown
                id="genre"
                name="genre"
                placeholder="Choose genre"
                search
                selection
                options={this.props.genres}
                onChange={this.handleChange}
                value={this.state.value} />
        )
    }
}

function mapStateToProps(state, props) {
    return {
      genres: state.genres
    }
  }

export default connect(mapStateToProps, { fetchGenresApi })(FilterGenres);