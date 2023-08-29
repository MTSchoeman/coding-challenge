import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
function BookList() {
  const { books, fetchBooks } = useBookContext();
  const [searchName, setSearchName] = useState('');
  const [fromReleaseDate, setFromReleaseDate] = useState('');
  const [toReleaseDate, setToReleaseDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    const apiUrl = `https://anapioficeandfire.com/api/books?name=${searchName}&fromReleaseDate=${fromReleaseDate}T00:00:00&toReleaseDate=${toReleaseDate}T00:00:00`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  }

  const handleCancel = () => {
    setSearchName('');
    setFromReleaseDate('');
    setToReleaseDate('');
    setSearchResults([]);
  }

  return (
    <div className='container-fluid'>
      <div id='stick-container'>
        <Pagination componentName="book" />
      </div>
      <h1>Game of Thrones Books</h1>
      <nav>
        <label htmlFor="searchName"></label>
        <input
          type="text"
          name="searchName"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <label htmlFor="fromReleaseDate">From Release Date:</label>
        <input
          type="date"
          name="fromReleaseDate"
          value={fromReleaseDate}
          onChange={(e) => setFromReleaseDate(e.target.value)}
        />

        <label htmlFor="toReleaseDate">To Release Date:</label>
        <input
          type="date"
          name="toReleaseDate"
          value={toReleaseDate}
          onChange={(e) => setToReleaseDate(e.target.value)}
        />

        {searching ? (
          <button type="button" disabled>
            Searching...
          </button>
        ) : (
          <button type="button" onClick={handleSearch} name="search">
            Search
          </button>
        )}
        <button type="button" onClick={handleCancel} name="cancel">
          Cancel
        </button>
      </nav>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((book, index) => (
            <Link
              to={{
                pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                state: { book: book },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
            >
              <div>
                <div className="card">
                  <div className="card-header text-center">
                    <h4 className="card-title">{book.name}</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div class="col-md-6">
                        <h4>Title: </h4>
                        <h6>{book.name ? book.name : 'Unknown'}</h6>
                      </div>
                      <div class="col-md-6">

                        <h4>ISBN: </h4>
                        <h6> {book.isbn ? book.isbn : 'Unknown'}</h6>
                      </div>
                      <hr />
                      <div class="col-xs-12">

                        <h4>Author: </h4>
                        <h6>{book.authors[0] ? book.authors.join(', ') : 'Unknown'}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          books.map((book, index) => (
            <Link
              to={{
                pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                state: { book: book },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
            >
              <div>
                <div className="card">
                  <div className="card-header text-center">
                    <h4 className="card-title">{book.name}</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div class="col-md-6">
                        <h4>Title: </h4>
                        <h6>{book.name ? book.name : 'Unknown'}</h6>
                      </div>
                      <div class="col-md-6">

                        <h4>ISBN: </h4>
                        <h6> {book.isbn ? book.isbn : 'Unknown'}</h6>
                      </div>
                      <hr />
                      <div class="col-xs-12">

                        <h4>Author: </h4>
                        <h6>{book.authors[0] ? book.authors.join(', ') : 'Unknown'}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
