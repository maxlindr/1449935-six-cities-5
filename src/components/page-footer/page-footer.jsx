import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

const PageFooter = ({container}) => (
  <footer className={container ? `footer container` : `footer`}>
    <Link className="footer__logo-link" to={AppRoute.ROOT}>
      <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
    </Link>
  </footer>
);

PageFooter.propTypes = {
  container: PropTypes.bool
};

export {PageFooter};
export default PageFooter;
