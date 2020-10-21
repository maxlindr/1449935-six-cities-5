import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./store/reducer";
import {offers, reviews} from './mocks/mocks';

const CITIES = [
  {
    name: `Paris`,
    coordinates: [48.8566, 2.3522]
  },
  {
    name: `Cologne`,
    coordinates: [50.9375, 6.9603]
  },
  {
    name: `Brussels`,
    coordinates: [50.8503, 4.3517]
  },
  {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9]
  },
  {
    name: `Hamburg`,
    coordinates: [53.5511, 9.9937]
  },
  {
    name: `Dusseldorf`,
    coordinates: [51.2277, 6.7735]
  }
];

const initialState = {
  user: {
    login: `Oliver.conner@gmail.com`
  },
  currentCity: CITIES[0].name,
  localOffers: [],
  cities: CITIES,
  offers,
  reviews
};

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
