import React from 'react';
import renderer from 'react-test-renderer';
import {OfferEssentials} from './offer-essentials';
import offer from '../../../__mocks__/offer-mock';

test(`OfferEssentials должен корректно отображаться`, () => {
  const component = renderer.create(
      <OfferEssentials offer={offer}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
