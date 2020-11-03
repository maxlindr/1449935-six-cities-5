export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  UPDATE_LOCAL_OFFERS: `UPDATE_LOCAL_OFFERS`,
  UPDATE_OFFER: `UPDATE_OFFER`,
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_USER_DATA: `SET_USER_DATA`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  INIT_CITIES: `INIT_CITIES`,
  SET_FETCHED_REVIEWS: `SET_FETCHED_REVIEWS`,
  SET_FETCHED_NEARBY_PLACES: `SET_FETCHED_NEARBY_PLACES`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer
  }),
  setAuthorizationStatus: (status) => ({
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  initCities: () => ({
    type: ActionType.INIT_CITIES,
  }),
  setFetchedReviews: (reviews) => ({
    type: ActionType.SET_FETCHED_REVIEWS,
    payload: reviews,
  }),
  setFetchedNearbyPlaces: (offers) => ({
    type: ActionType.SET_FETCHED_NEARBY_PLACES,
    payload: offers,
  }),
  setUserData: (data) => ({
    type: ActionType.SET_USER_DATA,
    payload: data,
  }),
};
