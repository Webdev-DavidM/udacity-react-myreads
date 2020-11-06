import React from 'react';
import Book from './Book';

export default function CurrentlyReading(props) {
  let books = props.books.map((book) => {
    return (
      <Book
        book={book}
        image={book.imageLinks.smallThumbnail}
        title={book.title}
        author={book.authors}
        id={book.id}
        key={book.id}
        updateBookshelves={props.updateBookshelves}
        currentShelf="currentlyReading"
      />
    );
  });
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
}
