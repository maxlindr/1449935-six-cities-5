import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const RENTAL_OFFERS_NUMBER = 5;

ReactDOM.render(<App rentalOffersNumber={RENTAL_OFFERS_NUMBER} />, document.querySelector(`#root`));
