import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PageService } from '../services/PageService';

export const CharacterContext = createContext();

export const useCharacterContext = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [characterListLoading, setCharacterListLoading] = useState(true);
  const fetchCharacters = async (page, pageSize) => {
    try {
      const response = await axios.get(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}`);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }finally{
      setCharacterListLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(PageService.characterCurrentPage, PageService.pageSize);
  }, [PageService.characterCurrentPage, PageService.pageSize]);
  return (
    <CharacterContext.Provider value={{ characters, fetchCharacters, characterListLoading }}>
      {children}
    </CharacterContext.Provider>
  );
};
