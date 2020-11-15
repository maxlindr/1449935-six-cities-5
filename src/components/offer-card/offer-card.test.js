import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import offer from '../../../__mocks__/offer-mock';
import OfferCard from './offer-card';

const renderer = new ShallowRenderer();

test(`OfferCard должен корректно отображаться`, () => {
  renderer.render(
      <OfferCard
        offer={offer}
        onMouseOver={() => {}}
        onMouseLeave={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
