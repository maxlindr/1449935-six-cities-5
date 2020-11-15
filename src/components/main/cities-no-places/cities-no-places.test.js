import React from 'react';
import renderer from 'react-test-renderer';
import CitiesNoPlaces from './cities-no-places';

test(`CitiesNoPlaces должен корректно отображаться`, () => {
  const component = renderer.create(
      <CitiesNoPlaces city={`Paris`} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
