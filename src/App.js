import React, { Fragment } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import CurrentlyReading from './components/CurrentlyReading';
import Read from './components/Read';
import WantToRead from './components/WantToRead';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchedBooks: [],
    showSearchPage: false,
  };

  clearSearch = () => {
    let emptyArray = [];
    this.setState({
      searchedBooks: emptyArray,
    });
  };

  searchForBooks = async (e) => {
    let emptyArray = [];
    //Below resets the state to nothing found if the user deletes the search input so it is blank again.
    if (e.target.value === '') {
      return this.setState({
        searchedBooks: emptyArray,
      });
    }

    // Below i search the database for results
    const results = await BooksAPI.search(e.target.value);

    // Below if the server returns an error object which states nothing found I will clear the state of searchedBooks
    // and treat them as none found rather than error
    if (results.error) {
      return this.setState({
        searchedBooks: emptyArray,
      });
    }

    //Here I will filter out results which dont have an thumbnail image
    let filteredResults = results.filter((book) => {
      return book.imageLinks;
    });

    // Now I will compare the list against my list of books and see if any are in there and if so then i will
    // add the shelf to the book object so a default value can be given when the book is rendered.
    // firstly using the spread operator i will join my arrays together

    const allMyBooks = [
      ...this.state.currentlyReading,
      ...this.state.read,
      ...this.state.wantToRead,
    ];

    // Below I am creating a new array so I dont mutate the state directly and then I am adding a shelf to each book object

    let newArrayOfBooks = filteredResults.map((searchedBook) => {
      let shelf = 'none';
      allMyBooks.map((myBook) => {
        if (searchedBook.id === myBook.id) {
          return (shelf = myBook.shelf);
        } else {
          return (searchedBook.shelf = shelf);
        }
      });
      return (searchedBook.shelf = shelf);
    });

    //Here I will filter out results which dont have an thumbnail image
    newArrayOfBooks = results.filter((book) => {
      return book.imageLinks;
    });

    this.setState({
      searchedBooks: newArrayOfBooks,
    });
  };

  //Here I make a api request to get books and place them on the correct shelf based on
  // their data about shelf.

  updateBookshelves = async () => {
    let booksList = await BooksAPI.getAll();
    const currentlyReading = booksList.filter(
      (book) => book.shelf === 'currentlyReading'
    );
    this.setState({
      currentlyReading,
    });
    const wantToRead = booksList.filter((book) => book.shelf === 'wantToRead');
    this.setState({
      wantToRead,
    });
    const read = booksList.filter((book) => book.shelf === 'read');
    this.setState({
      read,
    });
  };

  componentDidMount = () => {
    this.updateBookshelves();
  };

  render() {
    return (
      <div className="app">
        <Fragment>
          <Route
            exact
            path="/search"
            render={() => (
              <SearchResults
                books={this.state.searchedBooks}
                addSearchedBook={this.updateBookshelves}
                updateBookshelves={this.updateBookshelves}
                searchForBooks={this.searchForBooks}
                clearSearch={this.clearSearch}
              />
            )}
          />

          <div className="list-books-content">
            <div>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Header />
                    <CurrentlyReading
                      books={this.state.currentlyReading}
                      updateBookshelves={this.updateBookshelves}
                      currentShelf="currentlyReading"
                    />
                    <WantToRead
                      books={this.state.wantToRead}
                      updateBookshelves={this.updateBookshelves}
                      currentShelf="wantToRead"
                    />
                    <Read
                      books={this.state.read}
                      updateBookshelves={this.updateBookshelves}
                      currentShelf="read"
                    />
                    <div className="open-search">
                      <Link className="button" to="/search">
                        Add a book
                      </Link>
                    </div>
                  </Fragment>
                )}
              />
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default BooksApp;
