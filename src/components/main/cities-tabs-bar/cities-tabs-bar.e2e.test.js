import React from 'react';
import {mount} from 'enzyme';
import {CitiesTabsBar} from './cities-tabs-bar';
import cities from '../../../../__mocks__/city-mocks';

describe(`CitiesTabsBar`, () => {
  it(`Клик на неактивный CityTab приводит к вызову колбэка с аргументом в виде названия таба`, () => {
    const ACTIVE_TAB_CITY_NAME = cities[0].name;
    const INACTIVE_TAB_CITY_NAME = cities[1].name;

    const onChangeCity = jest.fn();

    const wrapper = mount(
        <CitiesTabsBar
          cities={cities}
          onChangeCity={onChangeCity}
          activeCity={ACTIVE_TAB_CITY_NAME}
        />
    );

    const inactiveTab = wrapper.findWhere((node) => (
      node.is(`a.tabs__item`) &&
      node.text() === INACTIVE_TAB_CITY_NAME
    ));

    inactiveTab.simulate(`click`);
    expect(onChangeCity).toHaveBeenCalledTimes(1);
  });
});
