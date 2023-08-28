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
    console.log(fromReleaseDate)
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
    <div>
      <Pagination componentName="book" />
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
      <ul>
      {searchResults.length > 0 ? (
          searchResults.map((book) => (
            <li key={book.url}>
              <Link
                to={{
                  pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                  state: { book: book },
                }}
              >
                {book.name === '' ? 'Nameless' : book.name}
              </Link>
            </li>
          ))
        ) : (
          books.map((book) => (
            <li key={book.url}>
              <Link
                to={{
                  pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                  state: { book: book },
                }}
              >
                {book.name === '' ? 'Nameless' : book.name}
              </Link>
            </li>
          ))
        )}
        {/* {searchResults.length > 0 ? (
          searchResults.map((book) => {
            <li key={book.name}>
              <Link to={{
                pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                state: { book: book }
              }}>
                {book.name === '' ? 'Nameless' : book.name}
              </Link>
            </li>
          })
        ) : (
          books.map((book) => {
            <li key={book.name}>
              <Link to={{
                pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                state: { book: book }
              }}>
                {book.name === '' ? 'Nameless' : book.name}
              </Link>
            </li>
          })
        )}

        {books.map(book => (
          <li key={book.name}>{book.name}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default BookList;
