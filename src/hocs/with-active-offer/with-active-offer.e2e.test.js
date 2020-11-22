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
  it(`должен при вызове колбэка onActivate менять проп activeOffer`, () => {
    wrapper.props().onActivate(activeOffer);
    expect(wrapper.props().activeOffer).toEqual(activeOffer);
  });

  it(`должен при вызове колбэка onDeactivate обнулять проп activeOffer`, () => {
    // Для выполнения данного теста требуется устанивить состояние компонента.
    // Поскольку реализация состояния компонента основана на хуках, прямого доступа к состоянию нет.
    // Придется устанавливать это состояние с помощью побочного эффекта, используя onActivate.
    wrapper.props().onActivate(activeOffer);
    // Убедимся, что состояние установлено корректно.
    expect(wrapper.props().activeOffer).toEqual(activeOffer);

    // Основной тест
    wrapper.props().onDeactivate();
    expect(wrapper.props().activeOffer).toBeNull();
  });
});
