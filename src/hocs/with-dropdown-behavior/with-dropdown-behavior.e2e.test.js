import React from 'react';
import {shallow} from 'enzyme';
import withDropdownBehavior from './with-dropdown-behavior';

const ACTIVE_OPTION_VALUE = `Active option`;

const MockComponent = () => <div />;
const MockComponentWrapped = withDropdownBehavior(MockComponent);

let wrapper;
let onChange = jest.fn();

const createOptionClickEvent = (value) => ({
  target: {
    dataset: {
      value
    }
  }
});

beforeEach(() => {
  onChange = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        onChange={onChange}
        activeOption={ACTIVE_OPTION_VALUE}
        options={{}}
      />
  );
});

describe(`withDropdownBehavior`, () => {
  it(`должен открываться`, () => {
    wrapper.props().onToggle();
    expect(wrapper.props().isOpened).toEqual(true);
  });

  it(`должен закрываться при клике на шапку`, () => {
    const instance = wrapper.instance();

    instance.state = {
      isOpened: true
    };

    wrapper.props().onToggle();
    expect(wrapper.props().isOpened).toEqual(false);
  });

  it(`должен закрываться при клике на item`, () => {
    const instance = wrapper.instance();

    instance.state = {
      isOpened: true
    };

    wrapper.props().onOptionClick(
        createOptionClickEvent(ACTIVE_OPTION_VALUE)
    );

    expect(wrapper.props().isOpened).toEqual(false);
  });

  it(`должен вызывать onChange и менять активный item при смене item`, () => {
    const INACTIVE_OPTION_VALUE = `Inactive option`;

    wrapper.props().onOptionClick(
        createOptionClickEvent(INACTIVE_OPTION_VALUE)
    );

    expect(onChange).toHaveBeenNthCalledWith(1, INACTIVE_OPTION_VALUE);
  });

  it(`не должен вызывать onChange при клике на активный item`, () => {
    wrapper.props().onOptionClick(
        createOptionClickEvent(ACTIVE_OPTION_VALUE)
    );

    expect(onChange).not.toHaveBeenCalled();
  });
});
