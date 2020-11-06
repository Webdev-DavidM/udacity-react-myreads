import React, { Component, Fragment } from 'react';
import * as BookAPI from '../BooksAPI';

export default class Book extends Component {
  addBookToShelf = async (e) => {
    await BookAPI.update(this.props.book, e.target.value);
    this.props.updateBookshelves();
  };

  render() {
    return (
      <Fragment>
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${this.props.image})`,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  onChange={(e) => this.addBookToShelf(e)}
                  defaultValue={this.props.currentShelf}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.author}</div>
          </div>
        </li>
      </Fragment>
    );
  }
}
