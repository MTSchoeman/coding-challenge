import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CharacterProvider } from './context/CharacterContext';
import { BookProvider } from './context/BookContext';
import { HouseProvider } from './context/HouseContext';

ReactDOM.render(
  <React.StrictMode>
    <CharacterProvider>
      <BookProvider>
        <HouseProvider>
          <App />
        </HouseProvider>
      </BookProvider>
    </CharacterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);