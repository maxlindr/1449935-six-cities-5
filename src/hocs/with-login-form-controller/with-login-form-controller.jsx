import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/actions/api-actions';
import {getAuthorizationStatus, getIsLoginFailedWithUnauthorized} from '../../store/selectors';
import {AuthorizationStatus} from '../../constants';
import {ActionCreator} from '../../store/actions/action';
import {omitProperties} from '../../utils';

const ANIMATION_FINISH_DELAY = 50;
const ANIMATION_DURATION = 600 + ANIMATION_FINISH_DELAY;

const withLoginFormController = (Component) => {
  class WithLoginFormController extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        isValid: false,
        isAnimationPlaying: false,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.isLoginFailedWithUnauthorized && !prevProps.isLoginFailedWithUnauthorized) {
        this.handleUnauthorizedResponse();
      }
    }

    handleUnauthorizedResponse() {
      this.props.setLoginFailed(false);
      this.setState({isAnimationPlaying: true});

      setTimeout(() => {
        this.setState({isAnimationPlaying: false});
      }, ANIMATION_DURATION);
    }

    handleSubmit(evt) {
      evt.preventDefault();
      const {email, password} = this.state;
      this.props.loginToServer(email, password);
    }

    handleEmailChange(evt) {
      this.setState({email: evt.target.value}, this.validate);
    }

    handlePasswordChange(evt) {
      this.setState({password: evt.target.value}, this.validate);
    }

    validate() {
      const {email, password} = this.state;

      this.setState({
        isValid: Boolean(email.trim() && password.trim())
      });
    }

    render() {
      const {email, password, isValid, isAnimationPlaying} = this.state;
      const {isPending} = this.props;

      const componentProps = omitProperties(this.props, [
        `isPending`,
        `isLoginFailedWithUnauthorized`,
        `loginToServer`,
        `setLoginFailed`
      ]);

      return (
        <Component
          {...componentProps}
          email={email}
          password={password}
          isValid={isValid}
          isDisabled={isPending}
          isAnimationPlaying={isAnimationPlaying}
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  WithLoginFormController.propTypes = {
    isPending: PropTypes.bool.isRequired,
    isLoginFailedWithUnauthorized: PropTypes.bool.isRequired,
    loginToServer: PropTypes.func.isRequired,
    setLoginFailed: PropTypes.func.isRequired,
  };

  return WithLoginFormController;
};

const mapStateToProps = (state) => ({
  isPending: getAuthorizationStatus(state) === AuthorizationStatus.PENDING,
  isLoginFailedWithUnauthorized: getIsLoginFailedWithUnauthorized(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginToServer(email, password) {
    dispatch(login(email, password));
  },
  setLoginFailed(value) {
    dispatch(ActionCreator.setLoginFailed(value));
  }
});

export {withLoginFormController};
export default (component) => connect(mapStateToProps, mapDispatchToProps)(withLoginFormController(component));
