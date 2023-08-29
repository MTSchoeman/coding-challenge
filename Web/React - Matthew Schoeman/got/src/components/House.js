import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import HouseSnip from './HouseSnip';
import CharacterSnip from './CharacterSnip';
function House({ house, history }) {

  const [heirFetch, setHeirFetch] = useState(null);
  const [founderFetch, setFounderFetch] = useState(null);
  const [currentLordFetch, setCurrentLordFetch] = useState(null);
  const [overlordFetch, setOverlordFetch] = useState(null);
  const [swornMembersFetch, setSwornMembersFetch] = useState(null);
  const [cadetBranchesFetch, setCadetBranchesFetch] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (house.currentLord !== '') {
          const response = await axios.get(house.currentLord);
          setCurrentLordFetch(response.data);
        }
        if (house.founder !== '') {
          const response = await axios.get(house.founder);
          setFounderFetch(response.data);
        }
  
        if (house.heir !== '') {
          const response = await axios.get(house.heir);
          setHeirFetch(response.data);
        }
        
        if (house.overlord !== '') {
          const response = await axios.get(house.overlord);
          setOverlordFetch(response.data);
        }
  
        if (house.swornMembers.length > 0) {
          const swornMembersPromises = house.swornMembers.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          });
  
          let membersArray = await Promise.all(swornMembersPromises);
          setSwornMembersFetch(membersArray);
        }
  
        if (house.cadetBranches.length > 0) {
          const cadetBranchesPromises = house.cadetBranches.map(async url => {
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              console.error(`Error fetching data from ${url}: ${error.message}`);
              return null;
            }
          });
  
          let cadetArray = await Promise.all(cadetBranchesPromises);
          setCadetBranchesFetch(cadetArray);
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }

    fetchData();
  }, [house]); 

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className="container mt-4">
      {house ? (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-2">
                    <button className="btn btn-outline-light my-2" onClick={handleGoBack}>
                      Go Back
                    </button>
                  </div>
                  <div className="col-8 text-center">
                    <h1 className="card-title">{house.name || 'Nameless'}</h1>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 mb-4" id="left-column">
                    <div className="container">
                      <div className="row px-2">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2">
                          <label>Region:</label> <br />
                          <h6>{house.region || 'Unknown'}</h6>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Heir: </label> <br /> <CharacterSnip character={heirFetch} /> </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Founder: </label> <br /> <CharacterSnip character={founderFetch} /> </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Current Lord: </label> <br /> <CharacterSnip character={currentLordFetch} /> </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Overlord: </label> <br /> <HouseSnip house={overlordFetch} /> </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Founded: </label> <br /> {house.founded ?
                          house.founded :
                          'Unknown'}</div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>Died Out: </label> <br /> {house.diedOut ?
                          house.diedOut :
                          'Unknown'}</div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 my-2"><label>House Words: </label> <br /> {house.words ?
                          house.words :
                          'Unknown'}</div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 my-2"><label>Coat of Arms: </label> <br /> {house.coatOfArms ?
                          house.coatOfArms : 'Unknown'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <h4 className="text-center">Seats</h4>
                        {house.seats[0] ? (
                          <ul>
                            {house.seats.map((seat, index) => (
                              <li key={index}>{seat}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No seats</p>
                        )}
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <h4 className="text-center">Cadet Branches</h4>
                        {cadetBranchesFetch ? (
                          <ul>
                            {cadetBranchesFetch.map((branch, index) => (
                              <li key={index}> <HouseSnip house={branch}/> </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Cadet Branches</p>
                        )}
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <h4 className="text-center">Ancestral Weapons</h4>
                        {house.ancestralWeapons[0] ? (
                          <ul>
                            {house.ancestralWeapons.map((weapon, index) => (
                              <li key={index}>{weapon}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Ancestral Weapons</p>
                        )}
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
                        <h4 className="text-center">Titles</h4>
                        {house.titles[0] ? (
                          <ul>
                            {house.titles.map((title, index) => (
                              <li key={index}>{title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No Titles</p>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="my-2">
                          <div className="card-header">
                            <h5 className="card-title text-center">Sworn Members</h5>
                          </div>
                          {swornMembersFetch ? (
                            <div className="card-body">
                              <div className="container">
                                <div className="row">
                                  {swornMembersFetch.map((member, index) => (
                                    <div key={index} className="col-xs-12 col-sm-12 col-md-4">
                                      <CharacterSnip character={member}/>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p style={{ color: 'white' }}>No Sworn Members</p>
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
      ) : (
        <h1>Retrieving House Details</h1>
      )}
    </div>
  );
}

export default withRouter(House);
