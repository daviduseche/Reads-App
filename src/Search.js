import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class Search extends React.Component {
  state = {
    requestedBooks: [],
     query: ''
  }

    searchBook = event => {
    this.query = event.target.value
    let bookShelf = this.props.books

    if (this.query) {
      BooksAPI.search(this.query).then(response => {
          this.setState({
            requestedBooks: response.map(result => {
              let bookOwned = bookShelf.find(b => b.id === result.id)
              return bookOwned || result
            })
          })
      })
    } else {
      this.setState({
        requestedBooks: []
      })
    }
  }

  render() {
    const { requestedBooks } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
            {this.query !== '' && (
              <ol className="books-grid">
                {requestedBooks.map(book => (
                  <li key={book.id}>
                    <Books
                      book={book}
                      updateShelf={this.props.updateShelf}
                    />
                  </li>
                ))}
              </ol>
            )}
           
        </div>
      </div>
    )
  }
}

export default Search
