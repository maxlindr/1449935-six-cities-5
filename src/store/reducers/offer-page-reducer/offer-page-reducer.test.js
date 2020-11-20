import {ActionType} from '../../actions/action';
import reducer from './offer-page-reducer';

const BLANK_STATE = {
  offer: null,
  reviews: null,
  nearbyPlaces: null,
};

const NON_BLANK_STATE = {
  offer: {},
  reviews: [],
  nearbyPlaces: [],
};

describe(`Offer page reducer`, () => {
  it(`должен возвращать текущий state при несуществующем action`, () => {
    expect(
        reducer(NON_BLANK_STATE, {
          type: ``
        })
    ).toEqual(
        NON_BLANK_STATE
    );
  });

  it(`должен сохранять offer в стейт`, () => {
    const OFFER = {id: `1`};

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_FETCHED_OFFER,
          payload: OFFER
        })
    ).toEqual(
        Object.assign({}, BLANK_STATE, {
          offer: OFFER
        })
    );
  });

  it(`должен сохранять отзывы в стейт`, () => {
    const REVIEWS = [{id: `1`}, {id: `2`}];

    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_FETCHED_REVIEWS,
          payload: REVIEWS
        })
    ).toEqual(
        Object.assign({}, BLANK_STATE, {
          reviews: REVIEWS
        })
    );
  });

  it(`должен сохранять nearby places id в стейт`, () => {
    expect(
        reducer(BLANK_STATE, {
          type: ActionType.SET_FETCHED_NEARBY_PLACES,
          payload: [
            {id: `1`},
            {id: `2`}
          ]
        })
    ).toEqual(
        Object.assign({}, BLANK_STATE, {
          nearbyPlaces: [`1`, `2`]
        })
    );
  });

  it(`должен сбрасывать стейт в исходное состояние`, () => {
    expect(
        reducer(NON_BLANK_STATE, {
          type: ActionType.RESET_OFFER_PAGE_STORE
        })
    ).toEqual(
        BLANK_STATE
    );
  });
});
