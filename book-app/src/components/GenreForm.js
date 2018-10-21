/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { fetchGenresApi, createGenre, fetchGenreApi } from '../actions/genre-actions';


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
    }
  }

  emptyForm() {
    const data = {
      id: shortid.generate(),
      title: '',
      author: '',
      country: '',
      genre: this.props.genres,
      year: null,
      publisher: '',
      isbn: '',
      edition: '',
      price: ''
    }
    return data;
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
    // Only for mock server
    delete this.state.data.id;
    this.state.data.id = shortid.generate();
    // non-mock

    this.props.createGenre(this.state.data)
      .then(genre => {
        console.log('successful genre submit', genre);
        this.setState({ modalOpen: false, editGenreId: null });

      })

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
      <button onClick={() => this.setState({ modalOpen: true })} style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" />
      </button>;
    
    return (
      <Transition duration={500}>
        <Modal trigger={addNewButton} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} closeIcon>
          <Header icon='file text outline' content={this.composeTitle()} />
          <Modal.Content>
            <Form id="newgenre" onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input autoFocus type="text" name="name" placeholder="Genre name" onChange={this.handleChange} value={this.state.data.text} />
              </Form.Field>
              <Form.Field>
                <Input autoFocus type="text" name="value" placeholder="Value" onChange={this.handleChange} value={this.state.data.value} />
              </Form.Field>
              {/* <Form.Field>
                <Input autoFocus type="text" name="date" placeholder="Country" onChange={this.handleChange} value={this.state.data.key} />
              </Form.Field> */}
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
  title: PropTypes.string,
  author: PropTypes.string,
  country: PropTypes.string,
  genre: PropTypes.string,
  year: PropTypes.number,
  publisher: PropTypes.string,
  isbn: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  const obj = {
    genres: state.genres,
    data: ownProps.data,
    editGenreId: ownProps.editGenreId
  }
  return obj;
}

export default connect(mapStateToProps, { createGenre, fetchGenresApi, fetchGenreApi })(GenreForm);