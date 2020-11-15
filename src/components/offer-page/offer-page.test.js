import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {OfferPage} from './offer-page';
import offerMock from '../../../__mocks__/offer-mock';

const renderer = new ShallowRenderer();

test(`OfferPage должен корректно отображаться`, () => {
  renderer.render(
      <OfferPage
        offer={offerMock}
        activeOffer={null}
        offers={[]}
        reviews={null}
        onUpdate={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
