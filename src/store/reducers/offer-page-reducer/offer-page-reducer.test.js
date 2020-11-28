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

  it(`должен обновлять offer в стейте, если если он имеет тот же id, что и обновляемый offer`, () => {
    const INITIAL_OFFER = {id: `1`, data: `initial data`};
    const UPDATED_OFFER = {id: `1`, data: `updated data`};

    const WITH_OFFER_STATE = Object.assign({}, BLANK_STATE, {
      offer: INITIAL_OFFER
    });

    expect(
        reducer(WITH_OFFER_STATE, {
          type: ActionType.UPDATE_OFFER,
          payload: UPDATED_OFFER
        })
    ).toEqual(
        Object.assign({}, BLANK_STATE, {
          offer: UPDATED_OFFER
        })
    );
  });

  it(`не должен обновлять offer в стейте, если он имеет id, не соответствующий id обновляемого offer`, () => {
    const INITIAL_OFFER = {id: `1`, data: `initial data`};
    const UPDATED_OFFER = {id: `2`, data: `updated data`};

    const WITH_OFFER_STATE = Object.assign({}, BLANK_STATE, {
      offer: INITIAL_OFFER
    });

    expect(
        reducer(WITH_OFFER_STATE, {
          type: ActionType.UPDATE_OFFER,
          payload: UPDATED_OFFER
        })
    ).toEqual(WITH_OFFER_STATE);
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
