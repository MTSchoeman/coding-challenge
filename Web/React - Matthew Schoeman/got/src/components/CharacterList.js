import React, { useState, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../styles/CharacterList.css'

import CharacterListCard from './CharacterListCard';
function CharacterList() {
  const { characters, fetchCharacters } = useCharacterContext();
  const [searchName, setSearchName] = useState('');
  const [searchCulture, setSearchCulture] = useState('');
  const [searchBorn, setSearchBorn] = useState('');
  const [searchDied, setSearchDied] = useState('');
  const [gender, setGender] = useState('');
  const [isAlive, setIsAlive] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [characterListPageSize, setCharacterListPageSizee] = useState(10);

  const handleSearch = async () => {
    setSearching(true);

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
        {!searchResults[0] && <Pagination componentName="character" />}
      </div>
      <div className='character nav-container'>
        <nav className='container'>
          <h1 className='text-center'>Characters</h1>
          <div className='row'>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="searchName">Name</label>
              <input className="form-control" type="text" name="searchName" placeholder="Jon Snow" value={searchName} onChange={(e) => setSearchName(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="searchCulture">Culture</label>
              <input className="form-control" type="text" name="searchCulture" placeholder="Northmen" value={searchCulture} onChange={(e) => setSearchCulture(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="searchBorn">Born</label>
              <input className="form-control" type="text" name="searchBorn" placeholder="283" value={searchBorn} onChange={(e) => setSearchBorn(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="searchDied">Died</label>
              <input className="form-control" type="text" name="searchDied" placeholder="283" value={searchDied} onChange={(e) => setSearchDied(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="gender">Gender</label>
              <select className="form-control" type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg text-center'>
              <label className='form-label' htmlFor="isAlive">Alive</label>
              <select className="form-control" type="text" name="isAlive" value={gender} onChange={(e) => setIsAlive(e.target.value)} >
                <option value="">Any</option>
                <option value="true">Alive</option>
                <option value="false">Dead</option>
              </select>
            </div>
          </div>
          <div className='col-12 text-center'>
            <div className='row'>

              <div className='col-5'></div>
              <div className='col-2'>
                <label className='form-label' htmlFor="characterListPageSize">Result Size</label>
                <input className="form-control" type="text" name="characterListPageSize" placeholder="REsult Size (10)" min="1" value={characterListPageSize} onChange={(e) => setCharacterListPageSizee(e.target.value)} ></input>
              </div>
            </div>
            <div className='col-5'></div>
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
            <button className='btn btn-outline-warning mx-1 mt-2' type="button" onClick={handleCancel} name="cancel">
              Cancel
            </button>
          </div>
        </nav>
      </div>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((character, index) => (
            <Link
              to={{
                pathname: `/characters/${character.name === '' ? 'Nameless' : character.name}`,
                state: { character: character },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
              <CharacterListCard character={character}/>
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
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
               <CharacterListCard character={character}/>
            </Link>
          ))
        )}
      </div>

    </div>
  );
}

export default CharacterList;