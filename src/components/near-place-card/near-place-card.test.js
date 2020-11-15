import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import offerMock from '../../../__mocks__/offer-mock';
import {NearPlaceCard} from './near-place-card';

const renderer = new ShallowRenderer();

test(`NearPlaceCard должен корректно отображаться`, () => {
  renderer.render(
      <NearPlaceCard
        offer={offerMock}
        onMouseOver={() => {}}
        onMouseLeave={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
