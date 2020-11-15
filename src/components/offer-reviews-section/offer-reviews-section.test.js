import React from 'react';
import renderer from 'react-test-renderer';
import reviewMocks from '../../../__mocks__/review-mocks';
import {OfferReviewsSection} from './offer-reviews-section';

test(`OfferReviewsSection должен корректно отображаться`, () => {
  const tree = renderer.create(
      <OfferReviewsSection
        reviews={reviewMocks}
        offerId={`1`}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
