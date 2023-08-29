import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Navigation from './components/Navigation'; // Import the Navigation component
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import BookList from './components/BookList';
import Book from './components/Book';
import HouseList from './components/HouseList';
import House from './components/House';
import { PageService } from './services/PageService';
function App() {

  PageService.FetchData(10);
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/houses" component={HouseList} />
          <Route
            path="/houses/:name"
            render={(props) => <House house={props.location.state.house} />}
          />
          <Route exact path="/characters" component={CharacterList} />
          <Route
            path="/characters/:name"
            render={(props) => <Character character={props.location.state.character} />}
          />
          <Route exact path="/books" component={BookList} />
          <Route
            path="/books/:name"
            render={(props) => <Book book={props.location.state.book} />}
          />
          <Redirect from="/" to="/houses" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;