import React from 'react';
import {Link} from 'react-router-dom';
import userPropTypes from '../../prop-types/user-prop-types';
import {connect} from 'react-redux';

const PageHeader = (props) => {
  const {user} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{user ? user.login : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  user: userPropTypes
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export {PageHeader};
export default connect(mapStateToProps)(PageHeader);
