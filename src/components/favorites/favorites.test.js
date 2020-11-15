import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Favorites from './favorites';
import offers from '../../../__mocks__/offer-mocks';

const renderer = new ShallowRenderer();

test(`Favorites должен корректно отображаться`, () => {
  renderer.render(
      <Favorites offers={offers} />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
