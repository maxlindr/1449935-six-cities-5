import React from 'react';
import renderer from 'react-test-renderer';
import {CityTab} from './city-tab';

test(`CityTab должен корректно отображаться`, () => {
  const component = renderer.create(
      <CityTab
        city={`Paris`}
        active={true}
        onActivate={() => {}}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
