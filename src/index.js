import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './store/reducers/root-reducer';
import {redirect} from './store/middlewares/redirect';
import {createAPI} from './services/api';
import {ActionCreator} from './store/actions/action';
import {fetchOffers, checkAuth} from './store/actions/api-actions';
import {AuthorizationStatus} from './constants';

const api = createAPI(
    () => store.dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTHORIZED))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

const initStoreData = store.dispatch(fetchOffers())
  .then(() => store.dispatch(ActionCreator.initCities()));

Promise.all([
  initStoreData,
  store.dispatch(checkAuth()),
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});
