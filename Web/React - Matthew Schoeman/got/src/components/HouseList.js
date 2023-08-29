import React, { useState } from 'react';
import { useHouseContext } from '../context/HouseContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../styles/HouseList.css'
function HouseList() {
  const { houses, fetchHouses} = useHouseContext();
  const [searchName, setSearchName] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [searchWords, setSearchWords] = useState('');
  const [hasDiedOut, setHasDiedOut] = useState('');
  const [hasTitles, setHasTitles] = useState('');
  const [hasSeats, setHasSeats] = useState('');
  const [hasWords, setHasWords] = useState('');
  const [hasAncestralWeapons, setHasAncestralWeapons] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    let newSearchName = '';
    if(searchName !== ''){
      newSearchName = `House ${searchName.trim()}`
    }
    const apiUrl = `https://anapioficeandfire.com/api/houses?name=${newSearchName}&searchRegion=${searchRegion}&searchWords=${searchWords}&hasDiedOut=${hasDiedOut}&hasTitles=${hasTitles}&hasSeats=${hasSeats}&hasWords=${hasWords}&hasAncestralWeapons=${hasAncestralWeapons}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.length > 0) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching houses:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleCancel = () => {
    setSearchName('');
    setSearchRegion('');
    setSearchWords('');
    setHasDiedOut('');
    setHasTitles('');
    setHasSeats('');
    setHasWords('');
    setHasAncestralWeapons('');
    setSearchResults([]);
  };

  return (
    <div className='container-fluid'>
      <div id='sticky-container'>
        <Pagination componentName="house" />
      </div>
      <h1>Game of Thrones Houses</h1>
      <nav>
        <label htmlFor="searchName"></label>
        <input
          type="text"
          name="searchName"
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        ></input>
        <br />
        <label htmlFor="searchRegion"></label>
        <input
          type="text"
          name="searchRegion"
          placeholder="Search by Region"
          value={searchRegion}
          onChange={(e) => setSearchRegion(e.target.value)}
        ></input>
        <br />
        <label htmlFor="searchWords"></label>
        <input
          type="text"
          name="searchWords"
          placeholder="Search by Words"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
        ></input>
        <div className="filterHouse">
          <label htmlFor="hasDiedOut">Has Died Out</label>
          <select value={hasDiedOut} onChange={(e) => setHasDiedOut(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Still Remains</option>
            <option value="false">Died Out</option>
          </select>
          <br/>
          <label htmlFor="hasTitles">Has Titles</label>
          <select value={hasTitles} onChange={(e) => setHasTitles(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br/>
          <label htmlFor="hasSeats">Has Seats</label>
          <select value={hasSeats} onChange={(e) => setHasSeats(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br/>
          <label htmlFor="hasWords">Has Words</label>
          <select value={hasWords} onChange={(e) => setHasWords(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br/>
          <label htmlFor="hasAncestralWeapons">Has Ancestral Weapons</label>
          <select value={hasAncestralWeapons} onChange={(e) => setHasAncestralWeapons(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br/>
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
          searchResults.map((house, index) => (
            <Link
                to={{
                  pathname: `/houses/${house.name === '' ? 'Nameless' : house.name}`,
                  state: { house: house },
                }}
                key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
              >
            <div>
              <div className="houseList card">
                <div className="houseList card-header text-center">
                    <h4 className="houseList card-title">{house.name}</h4>
                </div>
                <div className="houseList card-body">
                    <div className="row">
                        <div className="col-md-6">

                            <h4>Region: </h4>
                            <h6>{house.region ? house.region : 'Unknown'}</h6>
                        </div>
                        <div className="col-md-6">

                            <h4>Words: </h4>
                            <h6>{house.words ? house.words : 'Unknown'}</h6>
                        </div>
                        <hr />
                        <div className="col-xs-12">

                            <h4>Coat of Arms: </h4>
                            <h6> {house.coatOfArms ? house.coatOfArms : 'Unknown'}</h6>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            </Link>
          ))
        ) : (
          houses.map((house, index) => (
            <Link
                to={{
                  pathname: `/houses/${house.name === '' ? 'Nameless' : house.name}`,
                  state: { house: house },
                }}
                key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
              >
            <div>
              <div className="houseList card">
                <div className="houseList card-header text-center">
                    <h4 className="houseList card-title">{house.name}</h4>
                </div>
                <div className="houseList card-body">
                    <div className="row">
                        <div className="col-md-6">

                            <h4>Region: </h4>
                            <h6>{house.region ? house.region : 'Unknown'}</h6>
                        </div>
                        <div className="col-md-6">

                            <h4>Words: </h4>
                            <h6>{house.words ? house.words : 'Unknown'}</h6>
                        </div>
                        <hr />
                        <div className="col-xs-12">

                            <h4>Coat of Arms: </h4>
                            <h6> {house.coatOfArms ? house.coatOfArms : 'Unknown'}</h6>
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

export default HouseList;