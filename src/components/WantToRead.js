import React from 'react';
import Book from './Book';

export default function wantToRead(props) {
  let books = props.books.map((book) => {
    return (
      <Book
        image={book.imageLinks.smallThumbnail}
        title={book.title}
        author={book.authors}
        id={book.id}
        book={book}
        key={book.id}
        updateBookshelves={props.updateBookshelves}
        currentShelf="wantToRead"
      />
    );
  });
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want To Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
}
