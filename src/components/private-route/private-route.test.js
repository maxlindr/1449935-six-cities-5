import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route';
import {AppRoute, AuthorizationStatus} from '../../constants';

const MockComponent = () => <div>Mock component</div>;
const RedirectComponent = () => <div>Redirect component</div>;

const renderComponent = (authorizationStatus) => (
  renderer.create((
    <BrowserRouter>
      <PrivateRoute
        path={AppRoute.ROOT}
        authorizationStatus={authorizationStatus}
        render={MockComponent}
      />

      <Route path={AppRoute.LOGIN}>
        <RedirectComponent />
      </Route>
    </BrowserRouter>
  ))
);

describe(`PrivateRoute должен корректно отображаться`, () => {
  it(`Должен корректно отображаться при authorizationStatus=AuthorizationStatus.AUTHORIZED`, () => {
    const tree = renderComponent(AuthorizationStatus.AUTHORIZED).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Должен редиректить на маршрут /login при authorizationStatus=AuthorizationStatus.NOT_AUTHORIZED`, () => {
    const tree = renderComponent(AuthorizationStatus.NOT_AUTHORIZED).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
