import React from 'react';
import renderer from 'react-test-renderer';
import cityMapFactory, {CityMapType} from './city-map-factory';

test(`cityMapFactory должена возвращать корректно отображаемый компонент`, () => {
  const CityMap = cityMapFactory(CityMapType.MAIN);

  const component = renderer.create(
      <CityMap />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
