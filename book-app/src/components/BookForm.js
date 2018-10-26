/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { createBook, fetchBookApi, updateBook } from '../actions/book-actions';
import { fetchGenresApi } from '../actions/genre-actions';


const buttonDefaultStyles = {
  backgroundColor: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  margin: '20px 0px',
  float: 'left'
}

export class BookForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
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
      if (this.props.data === undefined) {
        this.setState({
          data: this.emptyForm()
        })
      } else {
        this.setState({
          data: this.props.data,
          modalOpen: true,
        })
      }
      
    }
    if (prevProps.editBookId === null || this.state.data === undefined) {
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
    const data = {
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
    return data;
  }

  handleChange = (e, { name, value }) => {
    if (!name) {
      this.matchGenre()
    }
    const bookData = Object.assign(this.state.data, {
      [name]: value
    });
    this.setState({ data: bookData });
  }

  handleSubmit = () => {
    if (this.state.editBookId) {
      this.props.updateBook(this.state.data)
      .then(book => {
        // Updated book, close modal
        this.setState({ modalOpen: false });

      })
    } else {
      this.props.createBook(this.state.data)
      .then(book => {
        // Created book, close modal
        this.setState({ modalOpen: false });
      })
    }
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
      <button onClick={() => this.setState({ modalOpen: true, data: this.emptyForm(), editBookId: null })} style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" /> Add new
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
                {this.props.genres ? <Dropdown name="genre" placeholder="Choose genre" search selection options={this.props.genres} onChange={this.handleChange} value={this.state.data.genre} /> : ''}
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
    openNotification: state.openNotification,
    textNotification: state.textNotification
  }
  return obj;
}

export default connect(mapStateToProps, { createBook, fetchGenresApi, fetchBookApi, updateBook })(BookForm);