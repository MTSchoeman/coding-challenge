import React from 'react';
import { Link } from 'react-router-dom';
function Navigation(){
  return (
    <nav className='"navbar navbar-expand-lg navbar-dark bg-dark"'>
      <div className='container-fluid'>
        <a className="navbar-brand">
          <img src="https://freepngimg.com/save/13198-game-of-thrones-logo-picture/800x310" alt="Game of Thrones"
            width="100" />
        </a>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className='"navbar-nav"'>
            <li className='nav-item'>
              <Link className='nav-link' to="/houses">House</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/characters">Characters</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/books">Books</Link>
            </li>
          </ul>
          </div>
      </div>
    </nav>
  );
};

export default Navigation;