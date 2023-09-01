import React, { useState, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../styles/CharacterList.css'

import CharacterListCard from './CharacterListCard';
function CharacterList() {
  const { characters, fetchCharacters, characterListLoading } = useCharacterContext();
  const [searchName, setSearchName] = useState('');
  const [searchCulture, setSearchCulture] = useState('');
  const [searchBorn, setSearchBorn] = useState('');
  const [searchDied, setSearchDied] = useState('');
  const [gender, setGender] = useState('');
  const [isAlive, setIsAlive] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [characterListPageSize, setCharacterListPageSizee] = useState(10);
  const [charaterSearchBlankResults, setCharacterSearchBlankResults] = useState(false);
  const [showingCharacterListSearchResults, setShowingCharacterListListSearchResults] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    setShowingCharacterListListSearchResults(true);
    let newSearchBorn = '';
    if (searchBorn !== '') {
      newSearchBorn = `In ${searchBorn.trim()} AC`;
    }
    let newSearchDied = '';
    if (searchDied !== '') {
      newSearchDied = `In ${searchDied.trim()} AC`;
    }
    const apiUrl = `https://anapioficeandfire.com/api/characters?pageSize=${characterListPageSize}&name=${searchName}&culture=${searchCulture}&born=${newSearchBorn}&died=${newSearchDied}&gender=${gender}&isAlive=${isAlive}`;

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
      setCharacterSearchBlankResults(true)
      console.error('Error fetching characters:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleCancel = () => {
    setShowingCharacterListListSearchResults(false);
    setCharacterSearchBlankResults(false);
    setSearchName('');
    setSearchCulture('');
    setSearchBorn('');
    setGender('');
    setIsAlive('');
    setSearchResults([]);
  };

  return (
    <div className='container-fluid'>
      <div id='sticky-container'>
        {!showingCharacterListSearchResults && <Pagination componentName="character" />}
      </div>
      <div className='character nav-container'>
        <nav className='container'>
          <h1 className='text-center'>Characters</h1>
          <div className='row'>
            <div className='col-6 col-sm-4 col-md-2 offset-md-3 text-center'>
              <label className='form-label' htmlFor="searchName">Name</label>
              <input id='searchName' className="character form-control bg-dark text-white" type="text" name="searchName" placeholder="Jon Snow" value={searchName} onChange={(e) => setSearchName(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-2 text-center'>
              <label className='form-label' htmlFor="searchCulture">Culture</label>
              <input id='searchCulture' className="character form-control bg-dark text-white" type="text" name="searchCulture" placeholder="Northmen" value={searchCulture} onChange={(e) => setSearchCulture(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-2 text-center'>
              <label className='form-label' htmlFor="gender">Gender</label>
              <select id='gender' className='house form-select bg-dark text-white' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-2 offset-md-3 text-center'>
              <label className='form-label' htmlFor="isAlive">Vital Status</label>
              <select id='isAlive' className='house form-select bg-dark text-white' value={isAlive} onChange={(e) => setIsAlive(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Living</option>
                <option value="false">Deceased</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-2 text-center'>
              <label className='form-label' htmlFor="searchBorn">Born</label>
              <input id='searchBorn' className="character form-control bg-dark text-white" type="text" name="searchBorn" placeholder="283" value={searchBorn} onChange={(e) => setSearchBorn(e.target.value)} ></input>
            </div>
            {isAlive !== 'true' && (

              <div className='col-6 col-sm-4 col-md-2 text-center'>
                <label className='form-label' htmlFor="searchDied">Died</label>
                <input id='searchDied' className="character form-control bg-dark text-white" type="text" name="searchDied" placeholder="283" value={searchDied} onChange={(e) => setSearchDied(e.target.value)} ></input>
              </div>
            )}
          </div>
          <div className='col-12 text-center'>
            <div className='row'>
              <div className='col-4 col-sm-4 col-md-5'></div>
              <div className='col-4 col-sm-4 col-md-2'>
                <label className='form-label' htmlFor="characterListPageSize">Result Size</label>
                <input id='characterListPageSize' className="character form-control bg-dark text-white" type="text" name="characterListPageSize" placeholder={characterListPageSize} min="1" value={characterListPageSize} onChange={(e) => setCharacterListPageSizee(e.target.value)} ></input>
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
        {characterListLoading ? (
          <div className='col-12 text-center mt-4'>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((character, index) => (
            <Link
              to={{
                pathname: `/characters/${character.name === '' ? 'Nameless' : character.name}`,
                state: { character: character },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
              <CharacterListCard character={character} />
            </Link>
          ))
        ) : (
          <>
            {charaterSearchBlankResults ? (
              <div className='houseList text-center mt-4'>
                <h1>No matches found</h1>
            </div>
            ) : (
              characters.map((character, index) => (
                <Link
                  to={{
                    pathname: `/characters/${character.name === '' ? 'Nameless' : character.name}`,
                    state: { character: character },
                  }}
                  key={index}
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
                  <CharacterListCard character={character} />
                </Link>
              ))

            )}
          </>
        )}
      </div>

    </div>
  );
}

export default CharacterList;