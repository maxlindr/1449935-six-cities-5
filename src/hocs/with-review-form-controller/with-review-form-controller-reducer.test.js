import {ActionType} from './actions';
import reducer from './with-review-form-controller-reducer';

const BLANK_STATE = {
  rating: null,
  text: ``,
  isValid: false,
  isPending: false,
};

describe(`withReviewFormController reducer`, () => {
  it(`должен записывать rating в стейт`, () => {
    const RATING = 5;

    const EXPECTED_STATE = Object.assign({}, BLANK_STATE, {
      rating: RATING
    });

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_RATING,
          payload: RATING
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });

  it(`должен записывать text в стейт`, () => {
    const TEXT = `Text`;

    const EXPECTED_STATE = Object.assign({}, BLANK_STATE, {
      text: TEXT
    });

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_TEXT,
          payload: TEXT
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });

  it(`должен записывать isValid в стейт`, () => {
    const VALUE = true;

    const EXPECTED_STATE = Object.assign({}, BLANK_STATE, {
      isValid: VALUE
    });

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_VALID,
          payload: VALUE
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });

  it(`должен записывать isPending в стейт`, () => {
    const VALUE = true;

    const EXPECTED_STATE = Object.assign({}, BLANK_STATE, {
      isPending: VALUE
    });

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_PENDING,
          payload: VALUE
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });

  it(`должен сбрасывать стейт в исходный`, () => {
    const NON_BLANK_STATE = {
      rating: true,
      text: `Text`,
      isValid: true,
      isPending: true,
    };

    expect(
        reducer(NON_BLANK_STATE, {
          type: ActionType.RESET
        })
    ).toEqual(
        BLANK_STATE
    );
  });

  it(`должен устанавливать isValid=true при валидных данных`, () => {
    const VALID_RATING = 1;
    const VALID_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

    const INITIAL_STATE = Object.assign({}, BLANK_STATE, {
      rating: VALID_RATING,
      text: VALID_TEXT,
      isValid: false,
    });

    const EXPECTED_STATE = Object.assign({}, INITIAL_STATE, {
      isValid: true
    });

    expect(
        reducer(INITIAL_STATE, {
          type: ActionType.VALIDATE
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });

  it(`должен устанавливать isValid=false при валидных данных`, () => {
    const INVALID_RATING = 0;
    const VALID_TEXT = `Text`;

    const INITIAL_STATE = Object.assign({}, BLANK_STATE, {
      rating: INVALID_RATING,
      text: VALID_TEXT,
      isValid: true,
    });

    const EXPECTED_STATE = Object.assign({}, INITIAL_STATE, {
      isValid: false
    });

    expect(
        reducer(INITIAL_STATE, {
          type: ActionType.VALIDATE
        })
    ).toEqual(
        EXPECTED_STATE
    );
  });
});
