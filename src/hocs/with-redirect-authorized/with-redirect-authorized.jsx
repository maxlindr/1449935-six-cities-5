import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../store/selectors';
import {Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {omitProperties} from '../../utils';

const withRedirectAuthorized = (WrappedComponent) => {
  const WithRedirectAuthorized = (props) => (
    props.isAuthorized ? (
      <Redirect to={AppRoute.ROOT} />
    ) : (
      <WrappedComponent {...omitProperties(props, [`isAuthorized`])} />
    )
  );

  WithRedirectAuthorized.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  };

  return WithRedirectAuthorized;
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTHORIZED,
});

export {withRedirectAuthorized};

export default (WrapperComponent) => connect(mapStateToProps)(
    withRedirectAuthorized(WrapperComponent)
);
