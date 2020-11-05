import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import browserHistory from '../../browser-history';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesRouter from '../favorites-router/favorites-router';
import Room from '../room/room';
import ErrorPage from '../error-page/error-page';
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import {getFavoriteOffers, getOfferById} from '../../store/selectors';

const App = (props) => {
  const {favoriteOffers, findOfferById} = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <PrivateRoute
          exact
          path="/favorites"
          render={() => <FavoritesRouter offers={favoriteOffers} />}
        />

        <Route
          exact
          path="/offer/:id"
          render={({match}) => (
            <Room offer={findOfferById(match.params.id)} />
          )}
        />

        <Route exact path="/error">
          <ErrorPage />
        </Route>

        <Route >
          <ErrorPage message={`Resource not found`}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  findOfferById: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.arrayOf(offerPropTypes),
};

const mapStateToProps = (state) => ({
  findOfferById: (id) => getOfferById(state, id),
  favoriteOffers: getFavoriteOffers(state),
});

export {App};
export default connect(mapStateToProps)(App);
