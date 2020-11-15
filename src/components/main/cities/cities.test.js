import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Cities} from './cities';
import offers from '../../../../__mocks__/offer-mocks';

const renderer = new ShallowRenderer();

test(`Cities должен корректно отображаться`, () => {
  renderer.render(
      <Cities
        offers={offers}
        currentCity={`Paris`}
        activeOffer={null}
        onActivate={() => {}}
        onDeactivate={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
