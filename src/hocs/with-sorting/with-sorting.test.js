import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withSorting from './with-sorting';

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withSorting(MockComponent);

test(`withSorting должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
