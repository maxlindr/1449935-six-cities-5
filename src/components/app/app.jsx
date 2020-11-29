import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import browserHistory from '../../browser-history';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types/prop-types';
import Main from '../main/main';
import Login from '../login/login';
import FavoritesRouter from '../favorites-router/favorites-router';
import OfferPage from '../offer-page/offer-page';
import ErrorPage from '../error-page/error-page';
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import {getFavoriteOffers} from '../../store/selectors';
import {AppRoute} from '../../constants';

const App = (props) => {
  const {favoriteOffers} = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>

        <Route exact path={AppRoute.LOGIN}>
          <Login />
        </Route>

        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesRouter offers={favoriteOffers} />}
        />

        <Route
          exact
          path={AppRoute.OFFER}
          render={({match}) => (
            <OfferPage offerId={match.params.id} />
          )}
        />

        <Route exact path={AppRoute.ERROR}>
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
  favoriteOffers: PropTypes.arrayOf(offerPropTypes),
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

export {App};
export default connect(mapStateToProps)(App);
