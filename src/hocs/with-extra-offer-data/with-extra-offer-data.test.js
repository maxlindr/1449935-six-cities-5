import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withExtraOfferData} from './with-extra-offer-data';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

const MockComponentWrapped = withExtraOfferData(MockComponent);

test(`withExtraOfferData должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      offerId={`1`}
      offer={offer}
      getReviews={() => {}}
      getNearbyPlaces={() => {}}
      reset={() => {}}
      getOffer={() => {}}
      changeCity={() => {}}
      updateOffer={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
