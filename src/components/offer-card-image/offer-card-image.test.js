import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OfferCardImage from './offer-card-image';
import {OfferCardType} from '../../constants';
import offer from '../../../__mocks__/offer-mock';

const renderer = new ShallowRenderer();

test(`OfferCardImage должен корректно отображаться`, () => {
  renderer.render(
      <OfferCardImage
        offer={offer}
        cardType={OfferCardType.CITIES}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
