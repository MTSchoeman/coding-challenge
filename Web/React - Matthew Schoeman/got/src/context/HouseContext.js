import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PageService } from '../services/PageService';

export const HouseContext = createContext();

export const useHouseContext = () => useContext(HouseContext);

export const HouseProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [houseListLoading, setCharacterListLoading] = useState(true);

  const fetchHouses = async (page, pageSize) => {
    try {
      const response = await axios.get(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`);
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    } finally {
      setCharacterListLoading(false); 
    }
  };

  useEffect(() => {
    fetchHouses(PageService.characterCurrentPage, PageService.pageSize);
  }, [PageService.characterCurrentPage, PageService.pageSize]);
  
  return (
    <HouseContext.Provider value={{ houses, fetchHouses, houseListLoading }}>
      {children}
    </HouseContext.Provider>
  );
};
