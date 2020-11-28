import React from 'react';
import {mount} from 'enzyme';
import {SortDropdownList} from './sort-dropdown-list';

const SortType = {
  POPULAR: `popular`,
  TO_HIGH: `low-to-high`,
  TO_LOW: `high-to-low`,
  TOP_RATED: `top-rated`
};

const Options = {
  [SortType.POPULAR]: `Popular`,
  [SortType.TO_HIGH]: `Price: low to high`,
  [SortType.TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
};

let wrapper;
let onOptionClick;
let onToggle;

describe(`SortDropdownList`, () => {
  beforeEach(() => {
    onOptionClick = jest.fn();
    onToggle = jest.fn();

    wrapper = mount(
        <SortDropdownList
          isOpened={true}
          options={Options}
          activeOption={SortType.POPULAR}
          onToggle={onToggle}
          onOptionClick={onOptionClick}
        />
    );
  });

  it(`Клик на item вызывает колбэк onOptionClick`, () => {
    wrapper.find(`.places__option`).first().simulate(`click`);
    expect(onOptionClick).toHaveBeenCalledTimes(1);
  });

  it(`Клик на основании вызывает колбэк onToggle`, () => {
    wrapper.find(`.places__sorting-type`).simulate(`click`);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
