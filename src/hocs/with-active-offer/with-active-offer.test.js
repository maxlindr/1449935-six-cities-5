import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withActiveOffer from './with-active-offer';
import offerMocks from '../../../__mocks__/offer-mocks';
import offerPropTypes from '../../prop-types/offer-prop-types';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  activeOffer: offerPropTypes,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveOffer(MockComponent);

test(`withActiveOffer должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped offers={offerMocks} />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
