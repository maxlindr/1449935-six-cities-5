import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Alert from '../../components/alert/alert';
import {getAlertMessage} from '../../store/selectors';
import {ActionCreator} from '../../store/actions/action';

const deleteProperties = (from, names) => {
  const entries = Object.entries(from).filter(([key]) =>
    names.every((name) => key !== name)
  );

  return Object.fromEntries(entries);
};

export const withAlertDialog = (WrappedComponent) => {
  class WithAlertDialog extends React.PureComponent {
    componentWillUnmount() {
      const {alertDialogMessage, closeAlertDialog} = this.props;

      if (alertDialogMessage) {
        closeAlertDialog();
      }
    }

    render() {
      const {alertDialogMessage, closeAlertDialog} = this.props;

      const wrappedComponentProps = deleteProperties(this.props, [`alertDialogMessage`, `closeAlertDialog`]);

      return (
        <React.Fragment>
          <WrappedComponent {...wrappedComponentProps} />
          {
            alertDialogMessage
              ? <Alert message={alertDialogMessage} onClose={closeAlertDialog} />
              : null
          }
        </React.Fragment>
      );
    }

  }

  WithAlertDialog.propTypes = {
    alertDialogMessage: PropTypes.string,
    closeAlertDialog: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    alertDialogMessage: getAlertMessage(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    closeAlertDialog: () => dispatch(ActionCreator.closeAlert()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAlertDialog);
};

export default (WrapperComponent) => withAlertDialog(WrapperComponent);
