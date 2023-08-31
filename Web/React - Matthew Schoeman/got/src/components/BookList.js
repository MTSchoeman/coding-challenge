import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import BookListCard from './BookListCard';
import '../styles/BookList.css'
function BookList() {
  const { books, fetchBooks, bookListLoading } = useBookContext();
  const [searchName, setSearchName] = useState('');
  const [fromReleaseDate, setFromReleaseDate] = useState('');
  const [toReleaseDate, setToReleaseDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [bookListPageSize, setBookListPageSize] = useState(10);
  const [characterSearchBlankResults, setCharacterSearchBlankResults] = useState(false);
  const [showingCharacterListSearchResults, setShowingCharacterListSearchResults] = useState(false);
  const handleSearch = async () => {
    setShowingCharacterListSearchResults(true);
    setSearching(true);
    const apiUrl = `https://anapioficeandfire.com/api/books?pageSize=${bookListPageSize}&name=${searchName}&fromReleaseDate=${fromReleaseDate}T00:00:00&toReleaseDate=${toReleaseDate}T00:00:00`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
      } else {
        setCharacterSearchBlankResults(true);
        setSearchResults([]);
      }
    } catch (error) {
      setCharacterSearchBlankResults(true);
      console.error(error);
    } finally {
      setSearching(false);
    }
  }

  const handleCancel = () => {
    setShowingCharacterListSearchResults(false);
    setCharacterSearchBlankResults(false);
    setSearchName('');
    setFromReleaseDate('');
    setToReleaseDate('');
    setSearchResults([]);
  }

  return (
    <div className='container-fluid'>
      <div id='sticky-container'>
        {!showingCharacterListSearchResults && <Pagination componentName="book" />}
      </div>
      <div className='book nav-container'>
        <nav className='container'>
          <h1 className='text-center'>Books</h1>
          <div className='row'>
            <div className='col-6 col-sm-12 col-md text-center'>
              <label className='form-label' htmlFor="searchName">Name of Book</label>
              <input id='searchName' className='book form-control bg-dark text-white' ype="text" name="searchName" placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </div>
            <div className='col-6 col-sm-6 col-md text-center'>
              <label className='form-label' htmlFor="fromReleaseDate">From Release Date:</label>
              <input id='fromReleaseDate' className='book form-control bg-dark text-white' type="date" name="fromReleaseDate" value={fromReleaseDate} onChange={(e) => setFromReleaseDate(e.target.value)} />
            </div>
            <div className='col-6 col-sm-6 col-md text-center'>
              <label className='form-label' htmlFor="toReleaseDate">To Release Date:</label>
              <input id='toReleaseDate' className='book form-control bg-dark text-white' type="date" name="toReleaseDate" value={toReleaseDate} onChange={(e) => setToReleaseDate(e.target.value)} />
            </div>
          </div>
          <div className='col-12 text-center'>
            <div className='row'>

              <div className='col-4 col-sm-4 col-md-5'></div>
              <div className='col-4 col-sm-4 col-md-2'>
                <label className='form-label' htmlFor="bookListPageSize">Result Size</label>
                <input id='bookListPageSize' className='book form-control bg-dark text-white' type="text" name="bookListPageSize" placeholder={bookListPageSize} min="1" value={bookListPageSize} onChange={(e) => setBookListPageSize(e.target.value)} ></input>
              </div>
            </div>
            <div className='col-4 col-sm-4 col-md-5'></div>
          </div>
          <div className='col-12 text-center'>
            {searching ? (
              <button className='btn btn-outline-primary mx-1 mt-2' type="button" disabled>
                Searching...
              </button>
            ) : (
              <button className='btn btn-outline-light mx-1 mt-2' type="button" onClick={handleSearch} name="search">
                Search
              </button>
            )}
            <button className='btn btn-outline-warning mx-1 mt-2' type="button" onClick={handleCancel} name="clear">
              Clear
            </button>
          </div>
        </nav>
      </div>

      <div className="row">
        {bookListLoading ? (
          <div className='col-12 text-center mt-4'>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((book, index) => (
            <Link
              to={{
                pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                state: { book: book },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
              <BookListCard book={book} />
            </Link>
          ))
        ) : (
          <>
            {characterSearchBlankResults ? (
              <div className='houseList text-center mt-4'>
                <h1>No matches found</h1>
              </div>
            ) : (

              books.map((book, index) => (
                <Link
                  to={{
                    pathname: `/books/${book.name === '' ? 'Nameless' : book.name}`,
                    state: { book: book },
                  }}
                  key={index}
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
                  <BookListCard book={book} />
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookList;
