import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import BookList from './components/BookList';
import Book from './components/Book';
import HouseList from './components/HouseList';
import House from './components/House';
import { PageService } from './services/PageService';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {

  document.title = 'GOT | Houses';
  PageService.FetchData(10);
  return (

    <Router>
      <div className="App">
        <div className='light x1'></div>
        <div className='light x2'></div>
        <div className='light x3'></div>
        <div className='light x4'></div>
        <div className='light x5'></div>
        <div className='light x6'></div>
        <div className='light x7'></div>
        <div className='light x8'></div>
        <div className='light x9'></div>
        <Navigation />
        <Switch>
          <Route exact path="/Houses" component={HouseList} />
          <Route
            exact path="/Houses/:name"
            render={(props) => <House house={props.location.state.house} />}
          />
          <Route exact path="/Characters" component={CharacterList} />
          <Route
            path="/Characters/:name"
            render={(props) => <Character character={props.location.state.character} />}
          />
          <Route exact path="/Books" component={BookList} />
          <Route
            path="/Books/:name"
            render={(props) => <Book book={props.location.state.book} />}
          />
          <Redirect from="/" to="/Houses" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;