import React from "react";
import PropTypes from "prop-types";
import Main from '../main/main';

const App = (props) => {
  const {rentalOffersNumber} = props;

  return <Main rentalOffersNumber={rentalOffersNumber} />;
};

App.propTypes = {
  rentalOffersNumber: PropTypes.number.isRequired,
};

export default App;
