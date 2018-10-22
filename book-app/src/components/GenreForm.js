/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { fetchGenresApi, createGenre, fetchGenreApi, updateGenre } from '../actions/genre-actions';


const buttonDefaultStyles = {
  backgroundColor: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}

class GenreForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editGenreId: null,
      data: {
        id: shortid.generate(),
        title: '',
      }
    }
  }

  componentDidMount() {
    this.props.fetchGenresApi();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data,
        modalOpen: true
      })
    }
    if (prevProps.editGenreId === null || this.state.data === undefined) {
      this.setState({
        data: this.emptyForm(),
      });
    } else if (prevProps.editBookId !== this.props.editBookId) {
      this.setState({
        editBookId: this.props.editBookId
      })
    }
    if (prevProps.modalOpen !== this.props.modalOpen) {
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
    }
  }

  emptyForm() {
    return {
      id: shortid.generate(),
      title: '',
      author: '',
      country: '',
      genre: '',
      year: null,
      publisher: '',
      isbn: '',
      edition: '',
      price: ''
    }
  }

  handleChange = (e, { name, value }) => {
    if (!name) {
      name = e.target.name;
      value = e.target.value;
    }
    const genreData = Object.assign(this.state.data, {
      [name]: value
    });
    this.setState({ data: genreData });
  }

  handleSubmit = () => {
    if (this.state.editBookId) {
      this.props.updateGenre(this.state.data)
      .then(book => {
        console.log('successful book update', book);
        this.setState({ modalOpen: false });

      })
    } else {
      this.props.createGenre(this.state.data)
        .then(genre => {
          console.log('successful genre submit', genre);
          this.setState({ modalOpen: false });

        })
    }
  }

  composeTitle() {
    let title;
    if (this.props.data) {
      title = 'Edit genre'
    } else {
      title = 'New genre'
    }
    return title;
  }

  render() {
    const addNewButton =
      <button onClick={() => this.setState({ modalOpen: true, data: this.emptyForm(), editBookId: null })} style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" /> Add new genre
      </button>;

    return (
      <Transition duration={500}>
        <Modal trigger={addNewButton} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false, data: this.emptyForm() })} closeIcon>
          <Header icon='file text outline' content={this.composeTitle()} />
          <Modal.Content>
            <Form id="newgenre" onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input autoFocus type="text" name="text" placeholder="Genre name" onChange={this.handleChange} value={this.state.data.text} />
              </Form.Field>
              <Form.Field>
                <Input autoFocus type="text" name="value" placeholder="Value" onChange={this.handleChange} value={this.state.data.value} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button form="newgenre" type="submit" color='green'>
              <Icon name='save' /> Save
              </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    )
  }
}

GenreForm.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  key: PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  const obj = {
    genres: state.genres,
    data: ownProps.data,
    editGenreId: ownProps.editGenreId
  }
  return obj;
}

export default connect(mapStateToProps, { createGenre, fetchGenresApi, fetchGenreApi, updateGenre })(GenreForm);