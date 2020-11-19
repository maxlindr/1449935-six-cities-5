import React from 'react';
import {shallow} from 'enzyme';
import {ReviewFormRating} from './review-form-rating';

describe(`ReviewFormRating`, () => {
  it(`Клик корректно отрабатывается`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(
        <ReviewFormRating
          rating={0}
          disabled={false}
          onClick={onClick}
        />
    );

    wrapper.find(`input`).first().simulate(`change`);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
