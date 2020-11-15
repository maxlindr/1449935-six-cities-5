import React from 'react';
import renderer from 'react-test-renderer';
import {RatingStars, RatingStarsType} from './rating-stars';

test(`RatingStars должен корректно отображаться`, () => {
  const component = renderer.create(
      <RatingStars
        rating={4}
        type={RatingStarsType.OFFER}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
