import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {getAlertMessage} from '../../store/selectors';
import './style.css';

export const Alert = ({message, close}) => {

  return (
    <aside className="alert">
      <div className="alert__window">
        <div className="alert__container">
          <p className="alert__message">{message}</p>
        </div>
        <button className="button alert__button" type="button" onClick={close}>
          OK
        </button>
      </div>
    </aside>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  message: getAlertMessage(state)
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(ActionCreator.closeAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);

