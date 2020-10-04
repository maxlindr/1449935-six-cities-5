import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from '../main/main';

const App = (props) => {
  const {rentalOffersNumber} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main rentalOffersNumber={rentalOffersNumber} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  rentalOffersNumber: PropTypes.number.isRequired,
};

export default App;
