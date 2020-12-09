import React, {memo} from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';
import withLoginFormController from '../../hocs/with-login-form-controller/with-login-form-controller';
import './animation.css';
import withRedirectAuthorized from '../../hocs/with-redirect-authorized/with-redirect-authorized';

const ANIMATION_CLASSNAME = `shake`;

const Login = (props) => {
  const {
    email,
    password,
    isValid,
    isDisabled,
    isAnimationPlaying,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  } = props;

  const formClassName = isAnimationPlaying
    ? `login__form form ${ANIMATION_CLASSNAME}`
    : `login__form form`;

  return (
    <div className="page page--gray page--login">
      <PageHeader />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form
              className={formClassName}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
                  value={password}
                  onChange={onPasswordChange}
                />
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!isValid || isDisabled}
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
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isAnimationPlaying: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export {Login};

export default withRedirectAuthorized(
    withLoginFormController(
        memo(Login)
    )
);
