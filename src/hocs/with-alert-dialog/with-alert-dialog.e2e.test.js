import React from 'react';
import {shallow} from 'enzyme';
import {withAlertDialog} from './with-alert-dialog';
import {Alert} from '../../components/alert/alert';

const MockComponent = () => <div />;
const MockComponentWrapped = withAlertDialog(MockComponent);

describe(`withAlertDialog`, () => {
  it(`должен вызываться closeAlertDialog при активации колбэка onClose диалога`, () => {
    const onCloseAlertDialog = jest.fn();

    const wrapper = shallow(
        <MockComponentWrapped
          alertDialogMessage={`Message`}
          closeAlertDialog={onCloseAlertDialog}
        />
    );

    wrapper.find(Alert).props().onClose();
    expect(onCloseAlertDialog).toHaveBeenCalledTimes(1);
  });
});
