import React from 'react';
import renderer from 'react-test-renderer';
import {OfferFeatures} from './offer-features';

const FEATURES = [`Feature 1`, `Feature 2`, `Feature 3`];

test(`OfferFeatures должен корректно отображаться`, () => {
  const component = renderer.create(
      <OfferFeatures features={FEATURES} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
