import {ActionType} from '../../actions/action';
import reducer from './login-reducer';

const createState = (value) => ({
  isLoginFailedWithUnauthorized: value
});

describe(`Login reducer`, () => {
  it(`должен возвращать текущий state при несуществующем action`, () => {
    const NON_BLANK_STATE = createState(true);

    expect(
        reducer(NON_BLANK_STATE, {
          type: ``
        })
    ).toEqual(
        NON_BLANK_STATE
    );
  });

  it(`должен устанавливать значение флага равным true`, () => {
    expect(
        reducer(createState(false), {
          type: ActionType.SET_LOGIN_FAILED,
          payload: true
        })
    ).toEqual(
        createState(true)
    );
  });

  it(`должен устанавливать значение флага равным false`, () => {
    expect(
        reducer(createState(true), {
          type: ActionType.SET_LOGIN_FAILED,
          payload: false
        })
    ).toEqual(
        createState(false)
    );
  });
});
