import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesTabsBar} from './cities-tabs-bar';
import cities from '../../../../__mocks__/city-mocks';

test(`CitiesTabsBar должен корректно отображаться`, () => {
  const component = renderer.create(
      <CitiesTabsBar
        cities={cities}
        activeCity={`Paris`}
        changeCity={() => {}}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
