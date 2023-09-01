import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css'
import { Navbar, Nav } from 'react-bootstrap';
function Navigation() {

  const [selectedPage, setSelectedPage] = useState('house');

  const changeLinkColor = (page) => {
    switch (page) {
      case 'house': {
        document.title = 'GOT | Houses';
        break;
      }

      case 'character': {
        document.title = 'GOT | Characters';
        break;
      }
      case 'book': {
        document.title = 'GOT | Books';
        break;
      }
      default: {
        document.title = 'GOT | Houses';
      }
    }
    setSelectedPage(page);
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="Houses">
        <img
          src="https://freepngimg.com/save/13198-game-of-thrones-logo-picture/800x310"
          alt="Game of Thrones"
          width="100"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/Houses"
            onClick={() => changeLinkColor('house')}
            className={selectedPage === 'house' ? 'active' : ''}
          >
            Houses
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Books"
            onClick={() => changeLinkColor('book')}
            className={selectedPage === 'book' ? 'active' : ''}
          >
            Books
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Characters"
            onClick={() => changeLinkColor('character')}
            className={selectedPage === 'character' ? 'active' : ''}
          >
            Characters
          </Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
