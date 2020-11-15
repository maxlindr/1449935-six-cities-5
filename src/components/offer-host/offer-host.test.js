import React from 'react';
import renderer from 'react-test-renderer';
import {OfferHost} from './offer-host';

const HOST = {
  avatar: `img/avatar-angelina.jpg`,
  name: `Host Name`,
  super: true
};

test(`OfferHost должен корректно отображаться`, () => {
  const component = renderer.create(
      <OfferHost
        host={HOST}
        description={`Description`}
      />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
