import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withDropdownBehavior from './with-dropdown-behavior';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

const MockComponentWrapped = withDropdownBehavior(MockComponent);

test(`withDropdownBehavior должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      onChange={() => {}}
      activeOption={`Option`}
      options={{}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
