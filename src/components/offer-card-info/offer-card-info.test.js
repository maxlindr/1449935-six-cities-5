import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OfferCardInfo from './offer-card-info';
import offerMock from '../../../__mocks__/offer-mock';

const renderer = new ShallowRenderer();

test(`OfferCardInfo должен корректно отображаться`, () => {
  renderer.render(
      <OfferCardInfo
        offer={offerMock}
        favorites={true}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
