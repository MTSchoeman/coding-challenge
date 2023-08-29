import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CharacterSnip from './CharacterSnip';
function Book({ book, history }) {

  const [charactersFetch, setCharactersFetch] = useState(null);
  const [povCharactersFetch, setPovCharactersFetch] = useState(null);

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
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          })
          let charactersArray = await Promise.all(charactersPromises);
          setCharactersFetch(charactersArray);
        }

        if (book.povCharacters.length > 0) {
          const povCharactersPromises = book.povCharacters.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          });

          let povCharactersArray = await Promise.all(povCharactersPromises);
          setPovCharactersFetch(povCharactersArray);
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }

    fetchData();
  }, [book]);

  const FormatDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
  }
  return (
    <div className='container mt-4'>
      <div className='row'>
        {book ? (
          <div className='col-12'>
            <div className='card'>
              <div className='card=header'>
                <div className='row'>
                  <div className='col-2'>
                    <button className='btn btn-outline-light my-2' onClick={handleGoBack}>Go Back</button>
                  </div>
                  <div className='col-8 text-center'>
                    <h1 classname="card-title">{book.name ?? 'Nameless'} </h1>
                  </div>
                  <div className='col-2'></div>
                </div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className="col-sm-12 col-md-12 col-lg-12" id="left-column">
                    <div className="container">
                      <div className="row px-2">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">ISBN: </label> <br /> {book.isbn ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Number of Pages: </label> <br />
                          {book.numberOfPages ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Publisher: </label> <br />
                          {book.publisher ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Country: </label> <br />
                          {book.country ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Media Type: </label> <br />
                          {book.mediaType ?? 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Released: </label> <br />
                          {book.released ? FormatDate(book.released) : 'Unknown'}
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
                      {povCharactersFetch ? (
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
                      <div className="card-header">
                        <h5>Characters</h5>
                      </div>
                      {charactersFetch ? (
                        <div className="card-body">
                          <div className="container">
                            <div className="row">
                              {charactersFetch.map((character, index) => (
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
          <h1 style={{ color: 'white' }}>Retrieving Book Details</h1>
        )}
      </div>
    </div>
  );
}

export default withRouter(Book);
