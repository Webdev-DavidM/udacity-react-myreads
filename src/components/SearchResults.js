import React from 'react';
import SearchedBooks from './SearchedBooks';
import { withRouter } from 'react-router-dom';

function SearchResults(props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button
          className="close-search"
          onClick={() => {
            props.history.push('/');
            props.clearSearch();
          }}
        >
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => props.searchForBooks(e)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.books.length ? (
            <div>
              {' '}
              <SearchedBooks
                books={props.books}
                addSearchedBook={props.updateBookshelves}
                updateBookshelves={props.updateBookshelves}
              />
            </div>
          ) : (
            <div>No books found, please search again</div>
          )}
        </ol>
      </div>
    </div>
  );
}

export default withRouter(SearchResults);
