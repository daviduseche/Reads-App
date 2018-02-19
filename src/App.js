import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import {Route} from 'react-router-dom'
import Search from './Search'



class BooksApp extends React.Component {
  state = {
      books: []
  }
      shelf = [
    {
      title: 'Currently Reading',
      status: 'currentlyReading'
    },
    {
      title: 'Want To Read',
      status: 'wantToRead'
    },
    {
      title: 'Read',
      status: 'read'
    } ]
  
  
  
 
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => this.setState({books:books}))
    })
  }

  render() {
    const {books} = this.state   //object destructuring
    const {status, title} = this.shelf
    
    return (
      <div className="app">
        
        <Route exact path="/" render={() => (
          <Shelf
            books={books}
            shelves={this.shelf}
            title={title}
            status={status}
            updateShelf={this.updateShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
            <Search
              books={books}
              updateShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp