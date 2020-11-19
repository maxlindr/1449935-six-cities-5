import {ActionType} from '../../actions/action';
import reducer from './app-reducer';

const createState = (message) => ({
  alertMessage: message
});

const BLANK_STATE = createState(null);

describe(`App reducer`, () => {
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

  it(`должен возвращать `, () => {
    const MESSAGE = `Message`;

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SHOW_ALERT,
          payload: MESSAGE
        })
    ).toEqual(
        createState(MESSAGE)
    );
  });

  it(`должен записывать сообщение в стейт`, () => {
    const MESSAGE = `Message`;

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SHOW_ALERT,
          payload: MESSAGE
        })
    ).toEqual(
        createState(MESSAGE)
    );
  });

  it(`должен очищать стейт`, () => {
    expect(
        reducer(createState(`Message`), {
          type: ActionType.CLOSE_ALERT
        })
    )
    .toEqual(BLANK_STATE);
  });
});
