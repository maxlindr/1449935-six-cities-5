import React from 'react';
import {shallow} from 'enzyme';
import withActiveOffer from './with-active-offer';
import offers from '../../../__mocks__/offer-mocks';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveOffer(MockComponent);
const activeOffer = offers[0];
let wrapper;

beforeEach(() => {
  wrapper = shallow(
      <MockComponentWrapped offers={offers}/>
  );
});

describe(`withActiveOffer`, () => {
  it(`должен при вызове колбэка onActivate записывать в стейт активный offer`, () => {
    wrapper.props().onActivate(activeOffer);
    expect(wrapper.state().activeOffer).toEqual(activeOffer);
  });

  it(`должен при вызове колбэка onDeactivate обнулять активный offer`, () => {
    const instance = wrapper.instance();

    instance.state = {
      activeOffer
    };

    wrapper.props().onDeactivate();
    expect(wrapper.state().activeOffer).toBeNull();
  });
});
