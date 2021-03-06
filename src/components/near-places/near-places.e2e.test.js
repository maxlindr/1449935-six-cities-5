import React from 'react';
import {shallow} from 'enzyme';
import {NearPlaces} from './near-places';
import {OfferCard} from '../offer-card/offer-card';
import offers from '../../../__mocks__/offer-mocks';

describe(`NearPlaces`, () => {
  it(`должен отрабатывать события дочерних карточек mouseover/mouseleave`, () => {
    const onCardOver = jest.fn();
    const onCardLeave = jest.fn();

    const wrapper = shallow(
        <NearPlaces
          offers={offers.slice(0, 3)}
          onCardOver={onCardOver}
          onCardLeave={onCardLeave}
        />
    );

    const cardWrapper = wrapper
      .find(OfferCard)
      .first();

    cardWrapper.simulate(`mouseover`);
    expect(onCardOver).toHaveBeenCalledTimes(1);

    cardWrapper.simulate(`mouseleave`);
    expect(onCardLeave).toHaveBeenCalledTimes(1);
  });
});
