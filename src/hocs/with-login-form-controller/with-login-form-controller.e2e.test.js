import React from 'react';
import {shallow} from 'enzyme';
import {withHooks} from 'jest-react-hooks-shallow';
import {withLoginFormController} from './with-login-form-controller';

const createEvent = (value) => ({
  target: {
    value
  },
  preventDefault: () => {}
});

const MockComponent = () => <div />;
const MockComponentWrapped = withLoginFormController(MockComponent);

let wrapper;
let onLoginToServer;
let onSetLoginFailed;

beforeEach(() => {
  onLoginToServer = jest.fn();
  onSetLoginFailed = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        isPending={false}
        isLoginFailedWithUnauthorized={false}
        onLoginToServer={onLoginToServer}
        onSetLoginFailed={onSetLoginFailed}
      />
  );
});

describe(`withLoginFormController`, () => {

  it(`должен быть разблокирован если проп isPending=false`, () => {
    expect(wrapper.props().isDisabled).toEqual(false);
  });

  it(`должен быть заблокирован если проп isPending=true`, () => {
    wrapper.setProps({isPending: true});
    expect(wrapper.props().isDisabled).toEqual(true);
  });

  it(`должен при вызове onSubmit вызвать onLoginToServer с данными в аргументах`, () => {
    const LOGIN = `login`;
    const PASSWORD = `password`;

    wrapper.props().onEmailChange(createEvent(LOGIN));
    wrapper.props().onPasswordChange(createEvent(PASSWORD));
    wrapper.props().onSubmit(createEvent());
    expect(onLoginToServer).toHaveBeenNthCalledWith(1, LOGIN, PASSWORD);
  });

  describe(`Валидация`, () => {
    const LOGIN = `login`;
    const PASSWORD = `password`;

    it(`должен установить проп isValid=true при валидных данных`, () => {
      const runTestWithHooksSupport = (test) => withHooks(test);

      runTestWithHooksSupport(() => {
        wrapper.props().onEmailChange(createEvent(LOGIN));
        wrapper.props().onPasswordChange(createEvent(PASSWORD));
        expect(wrapper.props().isValid).toEqual(true);
      });
    });

    it(`должен установить проп isValid=false при невалидном логине`, () => {
      wrapper.props().onEmailChange(createEvent(``));
      wrapper.props().onPasswordChange(createEvent(PASSWORD));
      expect(wrapper.props().isValid).toEqual(false);
    });

    it(`должен установить проп isValid=false при невалидном пароле`, () => {
      wrapper.props().onEmailChange(createEvent(LOGIN));
      wrapper.props().onPasswordChange(createEvent(``));
      expect(wrapper.props().isValid).toEqual(false);
    });

    it(`должен установить проп isValid=false при невалидных логине и пароле`, () => {
      wrapper.props().onEmailChange(createEvent(``));
      wrapper.props().onPasswordChange(createEvent(``));
      expect(wrapper.props().isValid).toEqual(false);
    });
  });
});
