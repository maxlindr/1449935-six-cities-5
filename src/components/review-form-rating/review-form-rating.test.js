import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewFormRating} from './review-form-rating';

test(`ReviewFormRating должен корректно отображаться`, () => {
  const component = renderer.create(
      <ReviewFormRating
        rating={3}
        disabled={false}
        onClick={() => {}}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
