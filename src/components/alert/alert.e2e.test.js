import React from 'react';
import {shallow} from 'enzyme';
import {Alert} from './alert';

describe(`Alert`, () => {
  it(`Клик на кнопку OK`, () => {
    const onBtnClick = jest.fn();

    const wrapper = shallow(
        <Alert
          message={`Message`}
          onClose={onBtnClick}
        />
    );

    wrapper.find(`button`).simulate(`click`);
    expect(onBtnClick).toHaveBeenCalledTimes(1);
  });
});
