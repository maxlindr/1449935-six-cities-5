import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavoritesRouter from './favorites-router';
import offers from '../../../__mocks__/offer-mocks';

const renderer = new ShallowRenderer();

test(`FavoritesRouter должен корректно отображаться`, () => {
  renderer.render(
      <FavoritesRouter offers={offers} />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
