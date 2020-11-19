import React from 'react';
import {shallow} from 'enzyme';
import {BookmarkToggle, BookmarkToggleType} from './bookmark-toggle';

describe(`BookmarkToggle`, () => {
  it(`Клик отрабатывается`, () => {
    const onToggle = jest.fn();

    const wrapper = shallow(
        <BookmarkToggle
          active={false}
          type={BookmarkToggleType.CARD}
          onToggle={onToggle}
        />
    );

    wrapper.find(`button`).simulate(`click`);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
