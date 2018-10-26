/* eslint-disable */

import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchBooksApi, deleteBook } from '../actions/book-actions';
import Listing from '../components/Listing';
import BookForm from '../components/BookForm';
import FilterGenres from '../components/FilterGenres';

const thead = ['TITLE', 'AUTHOR', 'COUNTRY', 'GENRE', 'PRICE', 'ACTIONS'];

export class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateListing = this.updateListing.bind(this);
    // this.resetFilter = this.resetFilter.bind(this);
  }


  componentDidMount = () => {
    this.props.fetchBooksApi();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.books !== this.props.books) {
      this.setState({ books: this.props.books })
    }
  }

  handleDelete = (id) => {
    this.props.deleteBook(id).then(res => {
      this.props.fetchBooksApi();
    })
  }

  handleEdit(id) {
    this.setState({ editBookId: id, books: this.props.books, modalOpen: !this.state.modalOpen });
  }

  updateListing(value) {
    const books = this.props.books;
    const filteredBooks = books.filter(book => {
      return book.genre === value;
    })
    this.setState({ books: filteredBooks })
  }

  // resetFilter() {
  //   // this.setState({ books: this.props.books })
  // }

  render() {
    if (this.props.books === undefined || this.props.books.length === 0) {
      return (
        <Loader active inline='centered' />
      )
    } else {
      const data = this.state.books || this.props.books;
      const editBook = data.findIndex(x => x.id === this.state.editBookId) !== -1 ? data.findIndex(x => x.id === this.state.editBookId) : {};
      return (
        <div className="content">
          <BookForm data={data[editBook]} editBookId={this.state.editBookId} modalOpen={this.state.modalOpen}/>
          <FilterGenres updateListing={this.updateListing}/>
          {/* <Button onClick={this.resetFilter()}>Reset Filter</Button> */}
          <Listing thead={thead} data={data} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  if (state.books) {
    return {
      books: state.books
    }
  }
  
}

export default connect(mapStateToProps, { fetchBooksApi, deleteBook })(Books);