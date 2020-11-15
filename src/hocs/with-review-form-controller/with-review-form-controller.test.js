import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withReviewFormController} from './with-review-form-controller';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  text: PropTypes.string.isRequired,
  rating: PropTypes.number,
  isValid: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onRatingClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const MockComponentWrapped = withReviewFormController(MockComponent);

test(`withReviewFormController должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      offerId={`1`}
      postComment={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
