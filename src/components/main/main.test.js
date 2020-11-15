import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Main} from './main';
import offers from '../../../__mocks__/offer-mocks';
import cityMocks from '../../../__mocks__/city-mocks';

const renderer = new ShallowRenderer();

test(`Main должен корректно отображаться`, () => {
  renderer.render(
      <Main
        currentCityOffers={offers}
        currentCity={cityMocks[0]}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
