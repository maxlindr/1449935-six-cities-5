import React from 'react';
import {shallow} from 'enzyme';
import {NearPlaceCard} from './near-place-card';
import offer from '../../../__mocks__/offer-mock';

describe(`NearPlaceCard`, () => {
  it(`должен отрабатывать события mouseover/mouseleave`, () => {
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
        <NearPlaceCard
          offer={offer}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
    );

    wrapper.simulate(`mouseover`);
    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onMouseOver).toHaveBeenCalledWith(offer);

    wrapper.simulate(`mouseleave`);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
