import React from 'react'
import Books from './Books'

function BooksShelf ({books, status, title, updateShelf}){
  
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === status).map(book => (
              <li key={book.id}>
                <Books
                  book={book}
                  updateShelf={updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  
}

export default BooksShelf