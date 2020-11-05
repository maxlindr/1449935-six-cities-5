import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../page-header/page-header';

const ErrorPage = (props) => {
  const {message} = props;

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main">
        <h1 className="property__name">{message}</h1>
      </main>
    </div>
  );
};

ErrorPage.defaultProps = {
  message: `Oops! Something went wrong`
};

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired
};

export {ErrorPage};
export default ErrorPage;
