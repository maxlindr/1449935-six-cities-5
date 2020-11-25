import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import offer from '../../../__mocks__/offer-mock';
import {OfferCardType} from '../../constants';
import OfferCard from './offer-card';

const renderer = new ShallowRenderer();

describe(`OfferCard должен корректно отображаться`, () => {
  it(`Тип OfferCardType.CITIES`, () => {
    renderer.render(
        <OfferCard
          type={OfferCardType.CITIES}
          offer={offer}
          onMouseOver={() => {}}
          onMouseLeave={() => {}}
        />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it(`Тип OfferCardType.NEAR_PLACE`, () => {
    renderer.render(
        <OfferCard
          type={OfferCardType.NEAR_PLACE}
          offer={offer}
          onMouseOver={() => {}}
          onMouseLeave={() => {}}
        />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});

