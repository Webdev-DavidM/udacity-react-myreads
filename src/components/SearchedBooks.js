import React from 'react';
import SearchedBook from './SearchedBook';

export default function SearchedBooks(props) {
  let books = null;
  if (props.books) {
    books = props.books.map((book) => {
      return (
        <SearchedBook
          image={book.imageLinks.smallThumbnail}
          title={book.title}
          author={book.authors}
          id={book.id}
          book={book}
          key={book.id}
          updateBookshelves={props.updateBookshelves}
          currentShelf={book.shelf}
        />
      );
    });
  }

  return (
    <div className="bookshelf">
      {/* <h2 className="bookshelf-title">Want To Read</h2> */}
      <div className="bookshelf-books">
        <ol className="books-grid">{books}</ol>
      </div>
    </div>
  );
}
