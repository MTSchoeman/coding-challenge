import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CharacterProvider } from './context/CharacterContext';
import { BookProvider } from './context/BookContext';
import { HouseProvider } from './context/HouseContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CharacterProvider>
      <BookProvider>
        <HouseProvider>
          <App />
        </HouseProvider>
      </BookProvider>
    </CharacterProvider>
  </React.StrictMode>
);
