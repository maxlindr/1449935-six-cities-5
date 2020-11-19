import {ActionType} from '../../actions/action';
import reducer from './data-reducer';

const CITY_NAMES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const INITIAL_OFFERS = [
  {
    id: `1`,
    data: `data 1`,
    location: {
      city: {
        name: `Paris`,
        coordinates: [
          48.85661,
          2.351499
        ],
        zoom: 13
      }
    }
  },
  {
    id: `2`,
    data: `data 2`,
    location: {
      city: {
        name: `Cologne`,
        coordinates: [
          50.938361,
          6.959974
        ],
        zoom: 13
      }
    }
  },
  {
    id: `3`,
    data: `data 3`,
    location: {
      city: {
        name: `Brussels`,
        coordinates: [
          50.846557,
          4.351697
        ],
        zoom: 13
      }
    }
  }
];

let initialState;

beforeEach(() => {
  initialState = {
    currentCity: `Paris`,
    cities: CITY_NAMES,
    offers: INITIAL_OFFERS,
  };
});

describe(`Data reducer`, () => {
  it(`должен возвращать текущий state при несуществующем action`, () => {
    expect(
        reducer(initialState, {
          type: ``
        })
    ).toEqual(
        initialState
    );
  });

  it(`должен менять текущий город`, () => {
    const NEW_CITY_NAME = `Cologne`;

    expect(
        reducer(initialState, {
          type: ActionType.CHANGE_CITY,
          payload: NEW_CITY_NAME
        })
    ).toEqual(
        Object.assign({}, initialState, {
          currentCity: NEW_CITY_NAME
        })
    );
  });

  it(`должен менять оффер на новый`, () => {
    const OFFER1 = {id: `1`, data: `data 1`};
    const OFFER2 = {id: `2`, data: `data 2`};
    const OFFER3 = {id: `3`, data: `data 3`};
    const NEW_OFFER = {id: `2`, data: `new data`};

    const INITIAL_OFFERS_STATE = Object.assign({}, initialState, {
      offers: [OFFER1, OFFER2, OFFER3],
    });

    expect(
        reducer(INITIAL_OFFERS_STATE, {
          type: ActionType.UPDATE_OFFER,
          payload: NEW_OFFER
        })
    ).toEqual(
        Object.assign({}, initialState, {
          offers: [OFFER1, NEW_OFFER, OFFER3],
        })
    );
  });

  it(`должен загружать офферы`, () => {
    const NO_OFFERS_STATE = Object.assign({}, initialState, {
      offers: []
    });

    expect(
        reducer(NO_OFFERS_STATE, {
          type: ActionType.LOAD_OFFERS,
          payload: INITIAL_OFFERS
        })
    ).toEqual(
        Object.assign({}, NO_OFFERS_STATE, {
          offers: INITIAL_OFFERS
        })
    );
  });

  it(`должен инициализировать города`, () => {
    const reference = Object.assign({}, initialState, {
      cities: [
        {
          name: `Paris`,
          coordinates: [
            48.85661,
            2.351499
          ],
          zoom: 13
        },
        {
          name: `Cologne`,
          coordinates: [
            50.938361,
            6.959974
          ],
          zoom: 13
        },
        {
          name: `Brussels`,
          coordinates: [
            50.846557,
            4.351697
          ],
          zoom: 13
        }
      ],
    });

    expect(
        reducer(initialState, {
          type: ActionType.INIT_CITIES
        })
    ).toEqual(
        reference
    );
  });
});
