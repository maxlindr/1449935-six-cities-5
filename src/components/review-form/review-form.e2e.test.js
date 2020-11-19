import React from 'react';
import {mount} from 'enzyme';
import {ReviewForm} from './review-form';

describe(`ReviewForm`, () => {
  it(`Клик на кнопку Submit вызывает колбек onSubmit`, () => {
    const onRatingClick = jest.fn();
    const onSubmit = jest.fn();
    const onTextChange = jest.fn();

    const wrapper = mount(
        <ReviewForm
          text={`Text`}
          isValid={true}
          disabled={false}
          onTextChange={onTextChange}
          onRatingClick={onRatingClick}
          onSubmit={onSubmit}
        />
    );

    wrapper.find(`textarea`).simulate(`change`);
    expect(onTextChange).toHaveBeenCalledTimes(1);

    wrapper.find(`input`).first().simulate(`change`);
    expect(onRatingClick).toHaveBeenCalledTimes(1);

    wrapper.find(`button`).simulate(`submit`);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
