import React from 'react';
import renderer from 'react-test-renderer';
import {Alert} from './alert';

const MESSAGE = `Hello Jest!`;

test(`Alert должен корректно отображаться`, () => {
  const tree = renderer.create(
      <Alert message={MESSAGE} onClose={() => {}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
