import React from 'react';
import { withRouter } from 'react-router-dom';

function Character({ character, history }) {
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>

      <h2>{character.name === '' ? 'Nameless' : character.name}</h2>
      <p>Culture: {character?.culture}</p>
      <p>Born: {character?.born}</p>
      <p>Died: {character?.died}</p>
      <h3>Aliases:</h3>
    </div>
  );
}

export default withRouter(Character);
