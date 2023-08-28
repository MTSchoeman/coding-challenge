import React from 'react';
import { withRouter } from 'react-router-dom';

function House({ house, history }) {
  console.log(house);
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>

      <h2>{house.name === '' ? 'Nameless' : house.name}</h2>
    </div>
  );
}

export default withRouter(House);
