import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions';

const INITIAL_STATE = {
  email: ``,
  password: ``,
  isValid: false
};

const withLoginFormController = (Component) => {
  class WithLoginFormController extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = INITIAL_STATE;

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(evt) {
      evt.preventDefault();
      const {email, password} = this.state;
      this.props.loginToServer(email, password);
      this.setState(INITIAL_STATE);
    }

    handleEmailChange(evt) {
      this.setState({email: evt.target.value}, this.validate);
    }

    handlePasswordChange(evt) {
      this.setState({password: evt.target.value}, this.validate);
    }

    validate() {
      const {email, password} = this.state;

      this.setState({isValid: Boolean(email.trim() && password.trim())});
    }

    render() {
      const {email, password, isValid} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          isValid={isValid}
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  WithLoginFormController.propTypes = {
    loginToServer: PropTypes.func.isRequired
  };

  return WithLoginFormController;
};

const mapDispatchToProps = (dispatch) => ({
  loginToServer(email, password) {
    dispatch(login(email, password));
  },
});

export {withLoginFormController};
export default (component) => connect(null, mapDispatchToProps)(withLoginFormController(component));
