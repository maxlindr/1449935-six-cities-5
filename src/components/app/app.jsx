import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {offerPropTypes, userPropTypes} from '../../prop-types';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesRouter from '../favorites-router/favorites-router';
import Room from '../room/room';
import {connect} from 'react-redux';

const App = (props) => {
  const {offers, user} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
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
              offer={offers.find((offer) => offer.id === match.params.id)}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  user: userPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  offers: state.offers,
});

export {App};
export default connect(mapStateToProps)(App);
