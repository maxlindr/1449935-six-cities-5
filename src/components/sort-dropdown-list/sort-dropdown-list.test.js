import React from 'react';
import renderer from 'react-test-renderer';
import SortDropdownList from './sort-dropdown-list';

const SortType = {
  POPULAR: `popular`,
  TO_HIGH: `low-to-high`,
  TO_LOW: `high-to-low`,
  TOP_RATED: `top-rated`
};

const OPTIONS = {
  [SortType.POPULAR]: `Popular`,
  [SortType.TO_HIGH]: `Price: low to high`,
  [SortType.TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED]: `Top rated first`,
};

describe(`SortDropdownList`, () => {
  it(`должен корректно отображаться при isOpened=true`, () => {
    const component = renderer.create(
        <SortDropdownList
          isOpened={true}
          options={OPTIONS}
          activeOption={SortType.POPULAR}
          onToggle={() => {}}
          onOptionClick={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`должен корректно отображаться при isOpened=false`, () => {
    const component = renderer.create(
        <SortDropdownList
          isOpened={false}
          options={OPTIONS}
          activeOption={SortType.POPULAR}
          onToggle={() => {}}
          onOptionClick={() => {}}
          onChange={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
