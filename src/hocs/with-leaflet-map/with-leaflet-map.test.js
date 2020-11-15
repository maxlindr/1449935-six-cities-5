import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import {withLeafletMap} from './with-leaflet-map';
import offers from '../../../__mocks__/offer-mocks';
import cities from '../../../__mocks__/city-mocks';

jest.mock(`leaflet`, () => {
  const doNothing = () => {};

  const layer = {
    addTo: doNothing,
    addLayer: doNothing,
  };

  return {
    icon: doNothing,
    map: doNothing,
    tileLayer: () => layer,
    layerGroup: () => layer,
    marker: doNothing,
  };
});

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  reference: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired,
};

const MockComponentWrapped = withLeafletMap(MockComponent);

describe(`withLeafletMap`, () => {
  it(`Map should render map component with pins`, () => {
    const tree = renderer
      .create(<MockComponentWrapped city={cities[0]} offers={offers} />, {
        createNodeMock: () => document.createElement(`div`),
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
