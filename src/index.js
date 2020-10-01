import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const rentalOffersNumber = 5;

ReactDOM.render(<App rentalOffersNumber={rentalOffersNumber} />, document.querySelector(`#root`));
