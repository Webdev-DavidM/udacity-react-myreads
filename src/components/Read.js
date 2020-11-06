import React from 'react';
import Book from './Book';

export default function Read(props) {
  let books = props.books.map((book) => {
    return (
      <Book
        image={book.imageLinks.smallThumbnail}
        title={book.title}
        author={book.authors}
        id={book.id}
        key={book.id}
        book={book}
        updateBookshelves={props.updateBookshelves}
        currentShelf="read"
      />
    );
  });
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
}
