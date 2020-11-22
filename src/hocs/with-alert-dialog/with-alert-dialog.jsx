import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Alert from '../../components/alert/alert';
import {getAlertMessage} from '../../store/selectors';
import {ActionCreator} from '../../store/actions/action';
import {omitProperties} from '../../utils';

const withAlertDialog = (WrappedComponent) => {
  const WithAlertDialog = (props) => {
    const {alertDialogMessage, closeAlertDialog} = props;

    useEffect(() => {
      return () => {
        if (alertDialogMessage) {
          closeAlertDialog();
        }
      };
    }, []);

    const wrappedComponentProps = omitProperties(props, [`alertDialogMessage`, `closeAlertDialog`]);

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
  };

  WithAlertDialog.propTypes = {
    alertDialogMessage: PropTypes.string,
    closeAlertDialog: PropTypes.func.isRequired,
  };

  return WithAlertDialog;
};

const mapStateToProps = (state) => ({
  alertDialogMessage: getAlertMessage(state)
});

const mapDispatchToProps = (dispatch) => ({
  closeAlertDialog: () => dispatch(ActionCreator.closeAlert()),
});

export {withAlertDialog};

export default (WrappedComponent) => connect(mapStateToProps, mapDispatchToProps)(
    withAlertDialog(WrappedComponent)
);
