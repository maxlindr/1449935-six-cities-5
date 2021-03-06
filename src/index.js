import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './store/reducers/root-reducer';
import {redirect} from './store/middlewares/redirect';
import {goToRoute} from './store/middlewares/go-to-route';
import {createAPI} from './services/api';
import {ActionCreator} from './store/actions/action';
import {fetchOffers, checkAuth} from './store/actions/api-actions';
import {AuthorizationStatus, ErrorMessage} from './constants';
import {ErrorPage} from './components/error-page/error-page';

const api = createAPI(
    () => store.dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTHORIZED))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect),
        applyMiddleware(goToRoute)
    )
);

const initStoreData = store.dispatch(fetchOffers())
  .then(() => store.dispatch(ActionCreator.initCities()));

const root = document.querySelector(`#root`);

Promise.all([
  initStoreData,
  store.dispatch(checkAuth()),
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      root
  );
})
.catch(() => {
  ReactDOM.render(
      <ErrorPage message={ErrorMessage.GENERAL} />,
      root
  );
});
