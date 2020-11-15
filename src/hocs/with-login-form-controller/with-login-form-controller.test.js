import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withLoginFormController} from './with-login-form-controller';

const MockComponent = () => <div>Mock Component</div>;

MockComponent.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isAnimationPlaying: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const MockComponentWrapped = withLoginFormController(MockComponent);

test(`withLoginFormController должен корректно отображаться`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPending={false}
      isLoginFailedWithUnauthorized={false}
      loginToServer={() => {}}
      setLoginFailed={() => {}}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
