/* eslint-disable */

import React, { Component } from 'react';
import { Menu, Table, Icon, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { fetchBooksApi, deleteBook } from '../actions/book-actions';
import Listing from '../components/Listing';
import BookForm from '../components/BookForm';

const thead = ['TITLE', 'AUTHOR', 'COUNTRY', 'GENRE', 'PRICE', 'ACTIONS'];

class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }


  componentDidMount = () => {
    this.props.fetchBooksApi();
  }

  handleDelete = (id) => {
    console.log('delete::', id);
    this.props.deleteBook(id).then(res => {
      console.log('book deleted!!', res);
      this.props.fetchBooksApi();
    })
  }

  handleCreate = () => {

  }

  handleEdit(id) {
    this.setState({ editBookId: id, books: this.props.books });
  }

  render() {
    if (this.props.books.length === 0) {
      return (
        <Loader active inline='centered' />
      )
    } else {
      const data = this.props.books;
      const editBook = data ? this.props.books.findIndex(x => x.id === this.state.editBookId) : null;
      const singleBook = editBook ? this.props.books[editBook] : null;
      return (
        <div>
          <BookForm data={this.props.books[editBook]} editBookId={this.state.editBookId} />
          <Listing thead={thead} data={data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, { fetchBooksApi, deleteBook })(Books);
// export default connect(mapStateToProps, { createBook, fetchBooksApi, deleteCV, copyCV })(Listing);
