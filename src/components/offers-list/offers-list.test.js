import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OffersList from './offers-list';
import offers from '../../../__mocks__/offer-mocks';

const renderer = new ShallowRenderer();

test(`OffersList должен корректно отображаться`, () => {
  renderer.render(
      <OffersList
        offers={offers}
        onActivate={() => {}}
        onDeactivate={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
