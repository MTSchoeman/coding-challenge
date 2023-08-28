// src/components/Character.js
import React from 'react';
import { withRouter } from 'react-router-dom';

function Book({ book, history }) {

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>

      <h2>{book.name === '' ? 'Nameless' : book.name}</h2>
      <p>Culture: {book?.culture}</p>
      <p>Released: {Date(book?.released) }</p>
      <p>Died: {book?.died}</p>
      <h3>Aliases:</h3>
    </div>
  );
}

export default withRouter(Book);
