import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './app';

const renderer = new ShallowRenderer();

test(`App должен корректно отображаться`, () => {
  renderer.render(
      <App />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
