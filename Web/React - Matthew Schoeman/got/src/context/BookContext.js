import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { PageService } from '../services/PageService';

export const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async (page, pageSize) => {
    try {
      const response = await axios.get(`https://www.anapioficeandfire.com/api/books?page=${page}&pageSize=${pageSize}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks(PageService.characterCurrentPage, PageService.pageSize);
  }, [PageService.characterCurrentPage, PageService.pageSize]);
  return (
    <BookContext.Provider value={{ books, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};