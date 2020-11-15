import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import renderer from 'react-test-renderer';
import {withRedirectAuthorized} from './with-redirect-authorized';
import {AppRoute} from '../../constants';

const WrappedComponent = withRedirectAuthorized(() => <div>WrappedComponent component</div>);
const RedirectComponent = () => <div>Redirect component</div>;

const renderComponent = (isAuthorized) =>
  renderer.create(
      <MemoryRouter initialEntries={[AppRoute.LOGIN]} initialIndex={0}>
        <Route path={AppRoute.LOGIN} exact>
          <WrappedComponent isAuthorized={isAuthorized} />
        </Route>

        <Route path={AppRoute.ROOT} exact>
          <RedirectComponent />
        </Route>
      </MemoryRouter>
  );

describe(`withRedirectAuthorized`, () => {
  it(`должен корректно отображаться если проп isAuthorized=false`, () => {
    const tree = renderComponent(false).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`должен редиректить на маршрут '/' если isAuthorized=true`, () => {
    const tree = renderComponent(true).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
