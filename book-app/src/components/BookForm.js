/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { createBook, fetchBookApi } from '../actions/book-actions';
import { fetchGenresApi } from '../actions/genre-actions';


const buttonDefaultStyles = {
  backgroundColor: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}

class BookForm extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      modalOpen: false,
      editBookId: null,
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
    console.log(this.state, this.props);
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: this.props.data,
        modalOpen: true
      })
    }
    if (prevProps.editBookId === null || this.state.data === undefined) {
      this.setState({
        data: this.emptyForm(),
      });
    }
    if (prevProps.modalOpen !== this.props.modalOpen) {
      this.setState({
        modalOpen: !this.state.modalOpen,
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
    const bookData = Object.assign(this.state.data, {
      [name]: value
    });
    this.setState({ data: bookData });
  }

  handleSubmit = () => {
    // Only for mock server
    delete this.state.data.id;
    this.state.data.id = shortid.generate();
    // non-mock

    this.props.createBook(this.state.data)
      .then(book => {
        console.log('successful book submit', book);
        this.setState({ modalOpen: false });

      })

  }

  composeTitle() {
    let title;
    if (this.props.data) {
      title = 'Edit book'
    } else {
     title = 'New book'
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
            <Form id="newbook" onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input autoFocus type="text" name="title" placeholder="book title" onChange={this.handleChange} value={this.state.data.title} />
              </Form.Field>
              <Form.Field>
                <Input autoFocus type="text" name="author" placeholder="Book author" onChange={this.handleChange} value={this.state.data.author} />
              </Form.Field>
              <Form.Field>
                <Input autoFocus type="text" name="country" placeholder="Country" onChange={this.handleChange} value={this.state.data.country} />
              </Form.Field>
              <Form.Field>
                <Input autoFocus type="text" name="isbn" placeholder="ISBN code" onChange={this.handleChange} value={this.state.data.isbn} />
              </Form.Field>
              <Form.Field>
                <Dropdown name="genre" placeholder="Choose genre" search selection options={this.props.genres} onChange={this.handleChange} value={this.state.data.genre} />
                {/* <Input autoFocus type="text" name="price" placeholder="Price" onChange={this.handleChange} /> */}
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button form="newbook" type="submit" color='green'>
              <Icon name='save' /> Save
              </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    )
  }
}

BookForm.propTypes = {
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
    editBookId: ownProps.editBookId
  }
  return obj;
}

export default connect(mapStateToProps, { createBook, fetchGenresApi, fetchBookApi })(BookForm);