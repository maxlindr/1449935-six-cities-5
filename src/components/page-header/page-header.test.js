import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {PageHeader} from './page-header';

const renderer = new ShallowRenderer();

test(`PageHeader должен корректно отображаться`, () => {
  renderer.render(
      <PageHeader />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
