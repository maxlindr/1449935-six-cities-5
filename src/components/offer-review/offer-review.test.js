import React from 'react';
import renderer from 'react-test-renderer';
import {OfferReview} from './offer-review';
import reviewMock from '../../../__mocks__/review-mock';

test(`OfferReview должен корректно отображаться`, () => {
  const component = renderer.create(
      <OfferReview review={reviewMock} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
