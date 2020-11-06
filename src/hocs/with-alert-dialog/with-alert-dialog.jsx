import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Alert from '../../components/alert/alert';
import {getAlertMessage} from '../../store/selectors';
import {ActionCreator} from '../../store/action';

const deleteProperties = (from, names) => {
  const entries = Object.entries(from).filter(([key]) =>
    names.every((name) => key !== name)
  );

  return Object.fromEntries(entries);
};

export const withAlertDialog = (WrappedComponent) => {
  const WithAlertDialog = (props) => {
    const {alertDialogMessage, alertDialogCloseHandler} = props;

    const wrappedComponentProps = deleteProperties(props, [`alertDialogMessage`, `alertDialogCloseHandler`]);

    return (
      <React.Fragment>
        <WrappedComponent {...wrappedComponentProps} />
        {
          alertDialogMessage
            ? <Alert message={alertDialogMessage} onClose={alertDialogCloseHandler} />
            : null
        }
      </React.Fragment>
    );
  };

  WithAlertDialog.propTypes = {
    alertDialogMessage: PropTypes.string,
    alertDialogCloseHandler: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    alertDialogMessage: getAlertMessage(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    alertDialogCloseHandler: () => dispatch(ActionCreator.closeAlert()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAlertDialog);
};

export default (WrapperComponent) => withAlertDialog(WrapperComponent);
