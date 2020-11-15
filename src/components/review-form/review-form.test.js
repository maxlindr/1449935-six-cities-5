import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewForm} from './review-form';

test(`ReviewForm должен корректно отображаться`, () => {
  const component = renderer.create(
      <ReviewForm
        text={`Text`}
        rating={5}
        isValid={true}
        onTextChange={() => {}}
        onRatingClick={() => {}}
        onSubmit={() => {}}
        disabled={false}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
