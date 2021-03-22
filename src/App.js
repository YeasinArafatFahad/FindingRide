import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import RideSearch from './components/RideSearch/RideSearch'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [data, setData] = useState({});
  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser, data, setData}}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/search-ride">
              <RideSearch />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
