import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CharacterSnip from './CharacterSnip';
import '../styles/Book.css'
function Book({ book, history }) {

  const [charactersFetch, setCharactersFetch] = useState(null);
  const [povCharactersFetch, setPovCharactersFetch] = useState(null);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
  const [isLoadingPOVCharacters, setIsLoadingPOVCharacters] = useState(true);
  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        
        if (book.characters.length > 0) {
          const charactersPromises = book.characters.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              return null;
            }
          })
          let charactersArray = await Promise.all(charactersPromises);
          charactersArray.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
    
          setCharactersFetch(charactersArray);
          setIsLoadingCharacters(false);
        }
        else{
          setIsLoadingCharacters(false);
        }

        if (book.povCharacters.length > 0) {
          const povCharactersPromises = book.povCharacters.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              return null;
            }
          });

          let povCharactersArray = await Promise.all(povCharactersPromises);
          setPovCharactersFetch(povCharactersArray);
          setIsLoadingPOVCharacters(false);
        }
        else{
          setIsLoadingPOVCharacters(false);
        }
      } catch (error) {
      }
    }

    fetchData();
  }, [book]);

  return (
    <div className='container my-4'>
      <div className='row'>
        {book ? (
          <div className='col-12'>
            <div className='book card'>
              <div className='book card-header'>
                <div className='row'>
                  <div className='col-2'>
                    <button className='btn btn-outline-light my-2' onClick={handleGoBack}>Go Back</button>
                  </div>
                  <div className='col-8 text-center'>
                    <h1 className="book card-title">{book.name ?? 'Nameless'} </h1>
                  </div>
                  <div className='col-2'></div>
                </div>
              </div>
              <div className='book card-body'>
                <div className='row'>
                  <div className="col-sm-12 col-md-12 col-lg-12" id="book-left-column">
                    <div className="container">
                      <div className="row px-2">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label htmlFor="book.isbn" className="mx-2">ISBN: </label> <br /> {book.isbn ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label  htmlFor="book.numberOfPages" className="mx-2">Number of Pages: </label> <br />
                          {book.numberOfPages ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label  htmlFor="book.publisher" className="mx-2">Publisher: </label> <br />
                          {book.publisher ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label  htmlFor="book.country" className="mx-2">Country: </label> <br />
                          {book.country ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label  htmlFor="book.mediaType" className="mx-2">Media Type: </label> <br />
                          {book.mediaType ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Released: </label> <br />
                          {book.released ? new Date(book.released).toDateString() : 'Unknown'}
                        </div>
                        <div className="col-xs-12 mb-2">
                          <label className="mx-2">Authors</label>
                          {book.authors ? (
                            <div className="container">
                              <div className="col-xs-12 col-sm-6 col-md-3">
                                {book.authors.map((author, index) => (
                                  <div key={index}>{author}</div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p>Unknown authors</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='row my-2'>
                      <h5>POV Characters</h5>
                      { isLoadingPOVCharacters ? (
                        <div className='col-12 text-center mt-4'>
                        <div className="book spinner-border spinner-border-lg" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      ) : povCharactersFetch ? (
                        <div className="container">
                          <div className="row">
                            {povCharactersFetch.map((character, index) => (
                              <div key={index} className="col-xs-12 col-sm-12 col-md-4">
                                <CharacterSnip character={character} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p>No POV Characters</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="col-12">
                    <div className="my-2">
                      <div className="book card-header">
                        <h5>Characters</h5>
                      </div>
                      {isLoadingCharacters ? (
                        <div className='col-12 text-center mt-4'>
                          <div className="book spinner-border spinner-border-lg" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : charactersFetch ? (
                        <div className="book card-body">
                          <div className="container">
                            <div className="row">
                              {charactersFetch?.map((character, index) => (
                                <div key={index} className="col-xs-12 col-sm-12 col-md-4">
                                  <CharacterSnip character={character} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>No Characters</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Retrieving Book Details</h1>
        )}
      </div>
    </div>
  );
}

export default withRouter(Book);
