import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import offerMocks from '../../../__mocks__/offer-mocks';
import {NearPlaces} from './near-places';

const renderer = new ShallowRenderer();

test(`NearPlaces должен корректно отображаться`, () => {
  renderer.render(
      <NearPlaces offers={offerMocks.slice(0, 3)} />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
