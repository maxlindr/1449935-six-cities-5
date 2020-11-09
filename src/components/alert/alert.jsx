import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export const Alert = ({message, onClose}) => {
  return (
    <aside className="alert">
      <div className="alert__window">
        <div className="alert__container">
          <p className="alert__message">{message}</p>
        </div>

        <button
          className="button alert__button"
          type="button"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </aside>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
