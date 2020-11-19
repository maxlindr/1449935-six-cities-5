import React from 'react';
import {shallow} from 'enzyme';
import {withSorting, SortType, sortOffers} from './with-sorting';
import offers from '../../../__mocks__/offer-mocks';

const fireOnChange = (sortType) => {
  const dropdown = wrapper.childAt(0);
  dropdown.props().onChange(sortType);
};

const MockComponent = () => <div />;
const MockComponentWrapped = withSorting(MockComponent);

const wrapper = shallow(
    <MockComponentWrapped offers={offers} />
);

describe(`withSorting`, () => {
  describe(`должен передавать сортированные данные при вызове onChange с аргументом`, () => {
    it(`popular`, () => {
      fireOnChange(SortType.POPULAR);
      const sortedResult = wrapper.props().offers;
      expect(sortedResult).toEqual(offers);
    });

    it(`low-to-high`, () => {
      fireOnChange(SortType.TO_HIGH);
      const sortedReference = sortOffers.byPriceLowToHigh(offers);
      const sortedResult = wrapper.props().offers;
      expect(sortedResult).toEqual(sortedReference);
    });

    it(`high-to-low`, () => {
      fireOnChange(SortType.TO_LOW);
      const sortedReference = sortOffers.byPriceHighToLow(offers);
      const sortedResult = wrapper.props().offers;
      expect(sortedResult).toEqual(sortedReference);
    });

    it(`top-rated`, () => {
      fireOnChange(SortType.TOP_RATED);
      const sortedReference = sortOffers.byRatingHighToLow(offers);
      const sortedResult = wrapper.props().offers;
      expect(sortedResult).toEqual(sortedReference);
    });
  });
});
