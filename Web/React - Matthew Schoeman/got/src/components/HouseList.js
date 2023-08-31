import React, { useState } from 'react';
import { useHouseContext } from '../context/HouseContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import '../styles/HouseList.css'
import HouseListCard from './HouseListCard';
function HouseList() {
  const { houses, fetchHouses, houseListLoading } = useHouseContext();
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
  const [houseListPageSize, setHouseListPageSize] = useState(10);
  const [houseSearchBlankResults, setHouseSearchBlankResults] = useState(false);
  const [showingHouseListSearchResults, setShowingHouseListSearchResults] = useState(false);
  const handleSearch = async () => {
    setShowingHouseListSearchResults(true);
    setSearching(true);
    let newSearchName = '';
    if (searchName !== '') {
      newSearchName = `House ${searchName.trim()}`
    }
    const apiUrl = `https://anapioficeandfire.com/api/houses?pageSize=${houseListPageSize}&name=${newSearchName}&region=${searchRegion}&words=${searchWords}&hasDiedOut=${hasDiedOut}&hasTitles=${hasTitles}&hasSeats=${hasSeats}&hasWords=${hasWords}&hasAncestralWeapons=${hasAncestralWeapons}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        setSearchResults(data);
      } else {
        setHouseSearchBlankResults(true);
        setSearchResults([]);
      }
    } catch (error) {
      setHouseSearchBlankResults(true);
      console.error('Error fetching houses:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleCancel = () => {
    setShowingHouseListSearchResults(false)
    setHouseSearchBlankResults(false);
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
        {!showingHouseListSearchResults && <Pagination componentName="house" />}
      </div>
      <div className='nav-container'>
        <nav className='container'>
          <h1 className='text-center'>Houses</h1>
          <div className='row'>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="searchName">House Name</label>
              <input id='searchName' className="house form-control bg-dark text-white" type="text" name="searchName" placeholder="Targaryen of King's Landing" value={searchName} onChange={(e) => setSearchName(e.target.value)} ></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor='searchRegion'>Region of House</label>
              <input id='searchRegion' className="house form-control bg-dark text-white" type="text" name="searchRegion" placeholder="The Crownlands" value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)}></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="searchWords">House Words</label>
              <input id='searchWords' className='house form-control bg-dark text-white' type="text" name="searchWords" placeholder="Fire and Blood" value={searchWords} onChange={(e) => setSearchWords(e.target.value)}></input>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasDiedOut">Legacy</label>
              <select id='hasDiedOut' className='house form-select bg-dark text-white' value={hasDiedOut} onChange={(e) => setHasDiedOut(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Continuing</option>
                <option value="false">Extinct</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasTitles">Titles</label>
              <select id='hasTitles' className='house form-select bg-dark text-white' value={hasTitles} onChange={(e) => setHasTitles(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasSeats">Seats</label>
              <select id='hasSeats' className='house form-select bg-dark text-white' value={hasSeats} onChange={(e) => setHasSeats(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-4 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasWords">Has House Words</label>
              <select id='hasWords' className='house form-select bg-dark text-white' value={hasWords} onChange={(e) => setHasWords(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-6 col-sm-5 col-md-4 col-lg-3 text-center'>
              <label className='form-label' htmlFor="hasAncestralWeapons">Ancestral Weapons</label>
              <select id='hasAncestralWeapons' className='house form-select bg-dark text-white' value={hasAncestralWeapons} onChange={(e) => setHasAncestralWeapons(e.target.value)}>
                <option value="" defaultValue></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className='col-12 text-center'>
              <div className='row'>
                <div className='col-4 col-sm-4 col-md-5'></div>
                <div className='col-4 col-sm-4 col-md-2'>
                  <label className='form-label' htmlFor="houseListPageSize">Result Size</label>
                  <input id='houseListPageSize' className="house form-control bg-dark text-white" type="text" name="houseListPageSize" placeholder={houseListPageSize} min="1" value={houseListPageSize} onChange={(e) => setHouseListPageSize(e.target.value)} ></input>
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
          </div>
        </nav>
      </div>
      <div className="row">
        {houseListLoading ? (
          <div className='col-12 text-center mt-4'>
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((house, index) => (
            <Link
              to={{
                pathname: `/houses/${house.name === '' ? 'Nameless' : house.name}`,
                state: { house: house },
              }}
              key={index}
              className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
              <HouseListCard house={house} />
            </Link>
          ))
        ) : (
          <>
            {houseSearchBlankResults ? (
              <div className='houseList text-center mt-4'>
                <h1>No matches found</h1>
              </div>
            ) : (

              houses.map((house, index) => (
                <Link
                  to={{
                    pathname: `/houses/${house.name === '' ? 'Nameless' : house.name}`,
                    state: { house: house },
                  }}
                  key={index}
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2">
                  <HouseListCard house={house} />
                </Link>
              ))
            )}
          </>
        )}
      </div>

    </div>
  );
}

export default HouseList;