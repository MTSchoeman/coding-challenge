import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const HouseContext = createContext();

export const useHouseContext = () => useContext(HouseContext);

export const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const response = await axios.get('https://www.anapioficeandfire.com/api/houses');
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    }

    fetchHouses();
  }, []);

  return (
    <HouseContext.Provider value={houses}>
      {children}
    </HouseContext.Provider>
  );
};
