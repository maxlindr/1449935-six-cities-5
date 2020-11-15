import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavoritesEmpty from './favorites-empty';

const renderer = new ShallowRenderer();

test(`FavoritesEmpty должен корректно отображаться`, () => {
  renderer.render(
      <FavoritesEmpty />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
