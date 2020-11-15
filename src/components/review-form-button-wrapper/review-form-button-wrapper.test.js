import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewFormButtonWrapper} from './review-form-button-wrapper';

test(`ReviewFormButtonWrapper должен корректно отображаться`, () => {
  const component = renderer.create(
      <ReviewFormButtonWrapper disabled={false} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
