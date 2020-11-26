import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavoritesPage from './favorites-page';
import offers from '../../../__mocks__/offer-mocks';

const renderer = new ShallowRenderer();

test(`FavoritesPage должен корректно отображаться`, () => {
  renderer.render(
      <FavoritesPage offers={offers} />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
