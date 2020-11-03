import React, {memo} from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';
import withLoginFormController from '../../hocs/with-login-form-controller/with-login-form-controller';
import {getUser} from '../../store/selectors';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppRoute} from '../../constants';

const Login = (props) => {
  const {email, password, isValid, user, onEmailChange, onPasswordChange, onSubmit} = props;

  if (user) {
    return <Redirect to={AppRoute.ROOT}/>;
  }

  return (
    <div className="page page--gray page--login">
      <PageHeader />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={onSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={onEmailChange}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValid}
              >
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.object,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: getUser(state),
});

export {Login};
export default connect(mapStateToProps)(withLoginFormController(memo(Login)));
