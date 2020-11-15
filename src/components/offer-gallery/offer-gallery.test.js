import React from 'react';
import renderer from 'react-test-renderer';
import {OfferGallery} from './offer-gallery';

const PHOTOS = [
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/15.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/16.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/9.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/10.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/4.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/19.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/14.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/3.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/2.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/11.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/1.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/17.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/5.jpg`,
  `https://assets.htmlacademy.ru/intensives/javascript-3/hotel/13.jpg`
];

test(`OfferGallery должен корректно отображаться`, () => {
  const component = renderer.create(
      <OfferGallery photos={PHOTOS} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
