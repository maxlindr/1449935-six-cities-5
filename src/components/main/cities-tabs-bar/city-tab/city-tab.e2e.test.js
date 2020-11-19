import React from 'react';
import {shallow} from 'enzyme';
import {CityTab} from './city-tab';

const mockEvent = {
  preventDefault() {}
};

const CITY_NAME = `Paris`;

describe(`CityTab`, () => {
  it(`При клике компонента с пропом active=false вызывается колбек с именем компонента в качестве аргумента`, () => {
    const onActivate = jest.fn();

    const wrapper = shallow(
        <CityTab
          city={CITY_NAME}
          active={false}
          onActivate={onActivate}
        />
    );

    wrapper.find(`a`).simulate(`click`, mockEvent);
    expect(onActivate).toHaveBeenCalledTimes(1);
    expect(onActivate).toHaveBeenCalledWith(CITY_NAME);
  });

  it(`При клике компонента с пропом active=true колбэк не вызывается`, () => {
    const onActivate = jest.fn();

    const wrapper = shallow(
        <CityTab
          city={CITY_NAME}
          active={true}
          onActivate={onActivate}
        />
    );

    wrapper.find(`a`).simulate(`click`, mockEvent);
    expect(onActivate).not.toHaveBeenCalled();
  });
});
