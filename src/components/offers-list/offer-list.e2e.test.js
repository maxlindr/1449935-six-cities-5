import React from 'react';
import {shallow} from 'enzyme';
import {OffersList} from './offers-list';
import {OfferCard} from '../offer-card/offer-card';
import offers from '../../../__mocks__/offer-mocks';

describe(`OffersList`, () => {
  it(`должен отрабатывать события mouseover/mouseleave на карточках`, () => {
    const onActivate = jest.fn();
    const onDeactivate = jest.fn();

    const wrapper = shallow(
        <OffersList
          offers={offers}
          onActivate={onActivate}
          onDeactivate={onDeactivate}
        />
    );

    const cardWrapper = wrapper
      .find(OfferCard)
      .first();

    cardWrapper.simulate(`mouseover`);
    expect(onActivate).toHaveBeenCalledTimes(1);

    cardWrapper.simulate(`mouseleave`);
    expect(onDeactivate).toHaveBeenCalledTimes(1);
  });
});
