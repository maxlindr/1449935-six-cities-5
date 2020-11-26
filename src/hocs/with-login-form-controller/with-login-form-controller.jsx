import React, {useState, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/actions/api-actions';
import {getAuthorizationStatus, getIsLoginFailedWithUnauthorized} from '../../store/selectors';
import {AuthorizationStatus} from '../../constants';
import {ActionCreator} from '../../store/actions/action';
import {omitProperties} from '../../utils';

const ANIMATION_FINISH_DELAY = 50;
const ANIMATION_DURATION = 600 + ANIMATION_FINISH_DELAY;

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const withLoginFormController = (Component) => {
  const WithLoginFormController = (props) => {
    const {isPending, isLoginFailedWithUnauthorized, onSetLoginFailed, onLoginToServer} = props;

    const prevIsLoginFailedWithUnauthorized = usePrevious(isLoginFailedWithUnauthorized);

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [isValid, setValid] = useState(false);
    const [isAnimationPlaying, setAnimationPlaying] = useState(false);

    const handleUnauthorizedResponse = useCallback(() => {
      onSetLoginFailed(false);
      setAnimationPlaying(true);

      setTimeout(() => {
        setAnimationPlaying(false);
      }, ANIMATION_DURATION);
    }, []);

    const handleSubmit = useCallback((evt) => {
      evt.preventDefault();
      onLoginToServer(email, password);
    }, [email, password]);

    const handleEmailChange = useCallback((evt) => {
      setEmail(evt.target.value);
    }, []);

    const handlePasswordChange = useCallback((evt) => {
      setPassword(evt.target.value);
    }, []);

    useEffect(() => {
      if (isLoginFailedWithUnauthorized && !prevIsLoginFailedWithUnauthorized) {
        handleUnauthorizedResponse();
      }
    }, [isLoginFailedWithUnauthorized]);

    useEffect(() => {
      setValid(Boolean(email.trim() && password.trim()));
    }, [email, password]);

    const componentProps = omitProperties(props, [
      `isPending`,
      `isLoginFailedWithUnauthorized`,
      `onLoginToServer`,
      `onSetLoginFailed`
    ]);

    return (
      <Component
        {...componentProps}
        email={email}
        password={password}
        isValid={isValid}
        isDisabled={isPending}
        isAnimationPlaying={isAnimationPlaying}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
    );
  };

  WithLoginFormController.propTypes = {
    isPending: PropTypes.bool.isRequired,
    isLoginFailedWithUnauthorized: PropTypes.bool.isRequired,
    onLoginToServer: PropTypes.func.isRequired,
    onSetLoginFailed: PropTypes.func.isRequired,
  };

  return WithLoginFormController;
};

const mapStateToProps = (state) => ({
  isPending: getAuthorizationStatus(state) === AuthorizationStatus.PENDING,
  isLoginFailedWithUnauthorized: getIsLoginFailedWithUnauthorized(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoginToServer(email, password) {
    dispatch(login(email, password));
  },
  onSetLoginFailed(value) {
    dispatch(ActionCreator.setLoginFailed(value));
  }
});

export {withLoginFormController};

export default (component) => connect(mapStateToProps, mapDispatchToProps)(
    withLoginFormController(component)
);
