import React, { useState, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
function CharacterList() {
  // const characters = useCharacterContext();
  const { characters, fetchCharacters } = useCharacterContext();
  const [searchName, setSearchName] = useState('');
  const [searchCulture, setSearchCulture] = useState('');
  const [searchBorn, setSearchBorn] = useState('');
  const [gender, setGender] = useState('');
  const [isAlive, setIsAlive] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);

    let newSearchBorn = ''
    if (searchBorn !== '') {
      newSearchBorn = `In ${searchBorn.trim()} AC`;
    }
    const apiUrl = `https://anapioficeandfire.com/api/characters?name=${searchName}&culture=${searchCulture}&born=${newSearchBorn}&gender=${gender}&isAlive=${isAlive}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
        console.log(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleCancel = () => {
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
        <Pagination componentName="character" />
      </div>
      <h1>Game of Thrones Characters</h1>
      <nav>
        <label htmlFor="searchName">Search by Name</label>
        <input
          type="text"
          name="searchName"
          placeholder="Walder"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        ></input>
        <br />
        <label htmlFor="searchCulture">Search by Culture</label>
        <input
          type="text"
          name="searchCulture"
          placeholder="Braavosi"
          value={searchCulture}
          onChange={(e) => setSearchCulture(e.target.value)}
        ></input>
        <br />
        <label htmlFor="searchBorn">Search by Born</label>
        <input
          type="number"
          name="searchBorn"
          placeholder="283"
          value={searchBorn}
          onChange={(e) => setSearchBorn(e.target.value)}
        ></input>
        <div className="filterCharacter">
          <label htmlFor="gender">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label htmlFor="isAlive">Alive</label>
          <select value={isAlive} onChange={(e) => setIsAlive(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Alive</option>
            <option value="false">Dead</option>
          </select>
          <br />
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
        </div>
      </nav>

      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((character, index) => (
            <Link
                to={{
                  pathname: `/characters/${character.name === '' ? 'Nameless' : character.name}`,
                  state: { character: character },
                }}
                key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
              >
            <div>
              <div className="card">
                <div className="card-header text-center">
                  <h4 className="card-title">{character.name ? character.name : 'Nameless'}</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Gender:</h4>
                      <h6>{character.gender ? character.gender : 'Gender not specified'}</h6>
                    </div>
                    <div className="col-md-6">
                      <h4>Culture:</h4>
                      <h6>{character.culture ? character.culture : 'Culture not specified'}</h6>
                    </div>
                    <hr />
                    <div className="col-xs-12">
                      <h4>Born:</h4>
                      <h6>{character.born ? character.born : 'Date not specified'}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))
        ) : (
          characters.map((character, index) => (
            <Link
                to={{
                  pathname: `/characters/${character.name === '' ? 'Nameless' : character.name}`,
                  state: { character: character },
                }}
                key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
              >
            <div>
              <div className="card">
                <div className="card-header text-center">
                  <h4 className="card-title">{character.name ? character.name : 'Nameless'}</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Gender:</h4>
                      <h6>{character.gender ? character.gender : 'Gender not specified'}</h6>
                    </div>
                    <div className="col-md-6">
                      <h4>Culture:</h4>
                      <h6>{character.culture ? character.culture : 'Culture not specified'}</h6>
                    </div>
                    <hr />
                    <div className="col-xs-12">
                      <h4>Born:</h4>
                      <h6>{character.born ? character.born : 'Date not specified'}</h6>
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

export default CharacterList;