import {ActionType} from '../../actions/action';
import reducer from './user-reducer';

const initialState = {
  user: null,
  authorizationStatus: `initial status`,
};

describe(`User reducer`, () => {
  it(`должен сохранять статус авторизации`, () => {
    const DESIRED_STATUS = `new status`;

    expect(
        reducer(initialState, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: DESIRED_STATUS
        })
    ).toEqual(
        Object.assign({}, initialState, {
          authorizationStatus: DESIRED_STATUS
        })
    );
  });

  it(`должен сохранять данные пользователя`, () => {
    const DESIRED_USER = {id: `user_id`};

    expect(
        reducer(initialState, {
          type: ActionType.SET_USER_DATA,
          payload: DESIRED_USER
        })
    )
    .toEqual(
        Object.assign({}, initialState, {
          user: DESIRED_USER
        })
    );
  });
});
