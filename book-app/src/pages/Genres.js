/* eslint-disable */

import React, { Component } from 'react';
import { Loader, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import shortid from 'shortid';

import { fetchGenresApi, createGenre, deleteGenre } from '../actions/genre-actions';
import GenreForm from '../components/GenreForm';
import Listing from '../components/Listing';

const thead = ['TEXT', 'VALUE', 'DATE'];

class Genres extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchGenresApi();
  }
  
  handleDelete = (id) => {
    this.props.deleteGenre(id).then(res => {
      this.props.fetchGenresApi();
    })
  }
  handleEdit(id) {
    this.setState({ editGenreId: id, genres: this.props.genres, modalOpen: !this.state.modalOpen });
  }


  render() {
    if (this.props.genres.length === 0) {
      return (
        <Loader active inline='centered' />
      )
    } else {
      const data = this.props.genres;
      const editGenre = data ? this.props.genres.findIndex(x => x.id === this.state.editGenreId) : null;
      const singleGenre = editGenre ? this.props.genres[editGenre] : null;
      return (
        <div>
          <GenreForm data={this.props.genres[editGenre]} editBookId={this.state.editGenreId} modalOpen={this.state.modalOpen}></GenreForm>
          <Listing thead={thead} data={data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
        </div>
      )
    }

  }
}

function mapStateToProps(state, props) {
  return {
    genres: state.genres
  }
}

export default connect(mapStateToProps, { fetchGenresApi, deleteGenre })(Genres);
