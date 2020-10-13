import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerPropTypes, reviewPropTypes} from '../../prop-types';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesRouter from '../favorites-router/favorites-router';
import Room from '../room/room';

let user = {login: `Oliver.conner@gmail.com`};

const App = (props) => {
  const {offers, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main user={user} offers={offers} reviews={reviews} />
        </Route>

        <Route exact path="/login">
          {/* Временно отключено для удобства тестирования */}
          {/* {user ? <Redirect to="/"/> : <Login />} */}
          <Login />
        </Route>

        <Route exact path="/favorites">
          {
            user
              ? (
                <FavoritesRouter
                  user={user}
                  offers={offers.filter((offer) => offer.favorite)}
                />
              )
              : <Redirect to="/"/>
          }
        </Route>

        <Route
          exact
          path="/offer/:id"
          render={({match}) => (
            <Room
              user={user}
              offer={offers.find((offer) => offer.id === match.params.id)}
              offers={offers}
              reviews={reviews}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default App;
