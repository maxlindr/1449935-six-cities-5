import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {PageFooter} from './page-footer';

const renderer = new ShallowRenderer();

test(`PageFooter должен корректно отображаться`, () => {
  renderer.render(<PageFooter />);

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
