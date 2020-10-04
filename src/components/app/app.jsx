import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from '../main/main';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Room from '../room/room';

const App = (props) => {
  const {rentalOffersNumber} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main rentalOffersNumber={rentalOffersNumber} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/offer/:id">
          <Room />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  rentalOffersNumber: PropTypes.number.isRequired,
};

export default App;
