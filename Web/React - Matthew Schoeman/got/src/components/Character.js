import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import CharacterSnip from './CharacterSnip';
import HouseSnip from './HouseSnip';
import BookSnip from './BookSnip';
import '../styles/Character.css'
function Character({ character, history }) {

  const [fatherFetch, setFatherFetch] = useState(null);
  const [motherFetch, setmotherFetch] = useState(null);
  const [spouseFetch, setSpouseFetch] = useState(null);
  const [allegiancesFetch, setAllegiancesFetch] = useState(null);
  const [booksFetch, setBooksFetch] = useState(null);
  const [povBooksFetch, setPovPovBooksFetch] = useState(null);

  const [isLoadingFather, setIsLoadingFather] = useState(true);
  const [isLoadingMother, setIsLoadingMother] = useState(true);
  const [isLoadingSpouse, setIsLoadingSpouse] = useState(true);
  const [isLoadingAllegienaces, setIsLoadingAllegiances] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isLoadingPovBooks, setIsLoadingPovBooks] = useState(true);
 
  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (character.father !== '') {
          try {
            const response = await axios.get(character.father);
            setFatherFetch(response.data);
            setIsLoadingFather(false);
          } catch (error) {
            console.error(`Error fetching data from ${character.father}: ${error.message}`);
            setIsLoadingFather(false);
          }
        }else{
          setIsLoadingFather(false);
        }

        if (character.mother !== '') {
          try{
            const response = await axios.get(character.mother);
            setmotherFetch(response.data);
            setIsLoadingMother(false);
          }catch(error){
            console.error(`Error fetching data from ${character.father}: ${error.message}`);
            setIsLoadingFather(false);
          }
        }
        else{
          setIsLoadingMother(false);
        }

        if (character.spouse !== '') {
          const response = await axios.get(character.spouse);
          setSpouseFetch(response.data);
          setIsLoadingSpouse(false);
        }
        else{
          setIsLoadingSpouse(false);
        }

        if (character.allegiances.length > 0) {
          const allegiancesPromises = character.allegiances.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          })
          let allegiancesArray = await Promise.all(allegiancesPromises);
          setAllegiancesFetch(allegiancesArray);
          setIsLoadingAllegiances(false);
        }
        else{
          setIsLoadingAllegiances(false);
        }

        if (character.books.length > 0) {
          const booksPromises = character.books.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          });

          let booksArray = await Promise.all(booksPromises);
          setBooksFetch(booksArray);
          setIsLoadingBooks(false);
        }
        else{
          setIsLoadingBooks(false);
        }

        if (character.povBooks.length > 0) {
          const povBookPromises = character.povBooks.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          })

          let povBookArray = await Promise.all(povBookPromises);
          setPovPovBooksFetch(povBookArray);
          setIsLoadingPovBooks(false);
        }
        else{
          setIsLoadingPovBooks(false);
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }

    fetchData();
  }, [character]);

  return (
    <div className="container my-4">
      <div className="row">
        {character ?
          <div className='col-12'>
            <div className='character card'>
              <div className='character card-header'>
                <div className='row'>
                  <div className='col-2'>
                    <button className="btn btn-outline-light my-2" onClick={handleGoBack}>Go Back</button>
                  </div>
                  <div className='col-8 text-center'>
                    <h1 className='character card-title'>{character.name ? character.name : 'Nameless'}</h1>
                  </div>
                  <div className='col-2'></div>
                </div>
              </div>
              <div className='character card-body'>
                <div className='row'>
                  <div className="col-sm-12 col-md-12 col-lg-12" id="character-left-column">
                    <div className="container">
                      <div className="row px-2">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Lived: </label>
                          <br />
                          {character.born ? character.born : 'Unknown'} -
                          {character.died ? character.died : 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Mother:</label>
                          {isLoadingMother ? (
                            <div className='col-12 text-center mt-4'>
                              <div className="character spinner-border spinner-border-lg" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <br /> <CharacterSnip character={motherFetch} />
                            </>
                          )}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Father:</label>
                          {isLoadingFather ? (
                            <div className='col-12 text-center mt-4'>
                              <div className="character spinner-border spinner-border-lg" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <br />
                              <CharacterSnip character={fatherFetch} />
                            </>
                          )}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Spouse:</label>
                          {isLoadingSpouse ? (
                            <div className='col-12 text-center mt-4'>
                            <div className="character spinner-border spinner-border-lg" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          ) : (
                            <>
                              <br />
                              <CharacterSnip character={spouseFetch} />  
                            </>
                          )}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Culture: </label>
                          <br />
                          {character.culture ? character.culture : 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Gender:</label>
                          <br />
                          {character.gender ? character.gender : 'Unknown'}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 my-2">
                          <label className="mx-2">Played By</label>
                          {character.tvSeries[0] ? (
                            <ul>
                              {character.playedBy.map((actor, index) => (
                                <li key={index}>{actor}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>Actors unknown</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    <div className='row my-2'>
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <h4 className="text-center">Titles</h4>
                        {character.titles[0] ? (
                          <ul>
                            {character.titles.map((title, index) => (
                              <li key={index}>{title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No titles</p>
                        )}
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <h4 className="text-center">Aliases</h4>
                        {character.aliases[0] !== '' ? (
                          <ul>
                            {character.aliases.map((alias, index) => (
                              <li key={index}>{alias}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Aliases</p>
                        )}
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <h4 className="text-center">Allegiances</h4>
                        { isLoadingAllegienaces ? (
                          <div className='col-12 text-center mt-4'>
                          <div className="character spinner-border spinner-border-lg" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        ):allegiancesFetch ? (
                          <ul>
                            {allegiancesFetch.map((ally, index) => (
                              <li key={index}>
                                <HouseSnip house={ally} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Allegiances</p>
                        )}
                      </div>
                      <hr />
                      <div className="col-xs-12">
                        <div className="my-2">
                          <div className="character card-header">
                            <h4 className="character card-title text-center">Books</h4>
                          </div>
                          { isLoadingBooks ? (
                            <div className='col-12 text-center mt-4'>
                            <div className="character spinner-border spinner-border-lg" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          ):booksFetch ? (
                            <div className="character card-body">
                              <div className="container">
                                <div className="row">
                                  {booksFetch.map((book, index) => (
                                    <div key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                                      <BookSnip book={book} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p>No Books</p>
                          )}
                        </div>
                        <hr />
                        <div className="col-xs-12">
                          <h4 className="text-center">POV Books</h4>
                          {isLoadingPovBooks ? (
                            <div className='col-12 text-center mt-4'>
                            <div className="character spinner-border spinner-border-lg" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          ):povBooksFetch ? (
                            <div className="container">
                              <div className="row">
                                {povBooksFetch.map((book, index) => (
                                  <div key={index} className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                                    <BookSnip book={book} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p>No POV Books</p>
                          )}

                          <hr />

                          <div className="col-xs-12">
                            <h4 className="text-center">Starred in</h4>
                            {character.tvSeries[0] ? (
                              <div className="container">
                                <div className="row">
                                  {character.tvSeries.map((season, index) => (
                                    <div key={index} className="col-xs-12 col-sm-4 col-md-3">
                                      <p className="text-center">{season}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <p>No TV Series</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : (
            <h1>Retrieving Character Details</h1>
          )}
      </div>
    </div>
  );
}

export default withRouter(Character);
