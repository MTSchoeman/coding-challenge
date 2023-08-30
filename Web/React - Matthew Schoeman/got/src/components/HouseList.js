import React, { useState } from 'react';
import { useHouseContext } from '../context/HouseContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../styles/HouseList.css'
function HouseList() {
  const { houses, fetchHouses } = useHouseContext();
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
    if (searchName !== '') {
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
      <div className='nav-container'>
        <nav className='container'>
          <h1 className='text-center'>Houses</h1>
          <div className='row'>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="searchName">Name</label>
              <input className="form-control" type="text" name="searchName" placeholder="Targaryen of King's Landing" value={searchName} onChange={(e) => setSearchName(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor='searchRegion'>Region</label>
              <input className="form-control" type="text" name="searchRegion" placeholder="The Crownlands" value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)}></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="searchWords">Words</label>
              <input className='form-control' type="text" name="searchWords" placeholder="Fire and Blood" value={searchWords} onChange={(e) => setSearchWords(e.target.value)}></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasDiedOut">Died Out</label>
              <select className='form-control' value={hasDiedOut} onChange={(e) => setHasDiedOut(e.target.value)}>
                <option value="">Any</option>
                <option value="true">Still Remains</option>
                <option value="false">Died Out</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasTitles">Titles</label>
              <select className='form-control' value={hasTitles} onChange={(e) => setHasTitles(e.target.value)}>
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasSeats">Seats</label>
              <select className='form-control' value={hasSeats} onChange={(e) => setHasSeats(e.target.value)}>
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasWords">Words</label>
              <select className='form-control' value={hasWords} onChange={(e) => setHasWords(e.target.value)}>
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasAncestralWeapons">Ancestral Weapons</label>
              <select className='form-control' value={hasAncestralWeapons} onChange={(e) => setHasAncestralWeapons(e.target.value)}>
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
          </div>
        </nav>
      </div>
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