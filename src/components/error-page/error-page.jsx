import React from 'react';
import PropTypes from 'prop-types';
import {PageHeader} from '../page-header/page-header';
import './style.css';
import {connect} from 'react-redux';
import {getErrorMessage} from '../../store/selectors';

const ErrorPage = (props) => {
  const {message, globalMessage} = props;

  return (
    <div className="page error-page">
      <PageHeader interactive={false}/>

      <main className="page__main">
        <h1 className="error-page__message">
          {message || globalMessage}
        </h1>
      </main>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
  globalMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  globalMessage: getErrorMessage(state)
});

export {ErrorPage};
export default connect(mapStateToProps)(ErrorPage);
