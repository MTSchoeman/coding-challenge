import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css'
import { Navbar, Nav } from 'react-bootstrap';
function Navigation() {

//   const ChangeLinkColor = () =>{

//   }
//   return (
//     <div className='container-fluid'>
//       <Navbar bg="dark" expand="lg" variant="dark">
//         <Navbar.Brand href="#">

//           <img
//             src="https://freepngimg.com/save/13198-game-of-thrones-logo-picture/800x310"
//             alt="Game of Thrones"
//             width="100"
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarSupportedContent" />
//         <Navbar.Collapse id="navbarSupportedContent">
//           <Nav className="mr-auto">
//             <Nav.Link as={Link} to="/houses">
//               House
//             </Nav.Link>
//             <Nav.Link as={Link} to="/characters">
//               Characters
//             </Nav.Link>
//             <Nav.Link as={Link} to="/books">
//               Books
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default Navigation;
const [selectedPage, setSelectedPage] = useState('house');

  const changeLinkColor = (page) => {
    console.log(page)
    setSelectedPage(page);
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#">
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
            to=""
            onClick={() => changeLinkColor('house')}
            className={selectedPage === 'house' ? 'active' : ''}
          >
            Houses
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="Books"
            onClick={() => changeLinkColor('book')}
            className={selectedPage === 'book' ? 'active' : ''}
          >
            Books
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="Characters"
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
