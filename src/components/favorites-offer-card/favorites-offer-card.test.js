import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavoritesOfferCard from './favorites-offer-card';
import offerMock from '../../../__mocks__/offer-mock';

const renderer = new ShallowRenderer();

test(`FavoritesOfferCard должен корректно отображаться`, () => {
  renderer.render(
      <FavoritesOfferCard offer={offerMock} />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
