import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withUpdateOfferOnFavoriteToggle} from './with-update-offer-on-favorite-toggle';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

const MockComponentWrapped = withUpdateOfferOnFavoriteToggle(MockComponent);

test(`withUpdateOfferOnFavoriteToggle должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      offer={offer}
      updateOffer={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
