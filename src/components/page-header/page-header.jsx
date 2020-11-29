import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import userPropTypes from '../../prop-types/user-prop-types';
import {connect} from 'react-redux';
import {AppRoute} from '../../constants';
import {getUser} from '../../store/selectors';

const LOGO_ELEMENT = <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />;

const PageHeader = ({user, interactive}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {interactive
              ? (
                <Link to={AppRoute.ROOT} className="header__logo-link">
                  {LOGO_ELEMENT}
                </Link>
              )
              : LOGO_ELEMENT
            }
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {interactive
                  ? (
                    <Link
                      to={user ? AppRoute.FAVORITES : AppRoute.LOGIN}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user ? user.email : `Sign in`}
                      </span>
                    </Link>
                  )
                  : null
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  user: userPropTypes,
  interactive: PropTypes.bool,
};

PageHeader.defaultProps = {
  interactive: true,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export {PageHeader};
export default connect(mapStateToProps)(PageHeader);
