import {ActionType} from '../../actions/action';
import reducer from './error-page-reducer';

const createState = (message) => ({message});

describe(`Error page reducer`, () => {
  it(`должен возвращать текущий state при несуществующем action`, () => {
    const NON_BLANK_STATE = createState(`message`);

    expect(
        reducer(NON_BLANK_STATE, {
          type: ``
        })
    ).toEqual(
        NON_BLANK_STATE
    );
  });

  it(`должен сохранять сообщение в стейт`, () => {
    const MESSAGE = `Message`;

    expect(
        reducer(createState(``), {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: MESSAGE
        })
    ).toEqual(
        createState(MESSAGE)
    );
  });
});
