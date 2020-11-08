export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  UPDATE_LOCAL_OFFERS: `UPDATE_LOCAL_OFFERS`,
  UPDATE_OFFER: `UPDATE_OFFER`,
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_USER_DATA: `SET_USER_DATA`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  INIT_CITIES: `INIT_CITIES`,
  SET_FETCHED_OFFER: `SET_FETCHED_OFFER`,
  SET_FETCHED_REVIEWS: `SET_FETCHED_REVIEWS`,
  SET_FETCHED_NEARBY_PLACES: `SET_FETCHED_NEARBY_PLACES`,
  SET_LOGIN_FAILED: `SET_LOGIN_FAILED`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  SHOW_ALERT: `SHOW_ALERT`,
  CLOSE_ALERT: `CLOSE_ALERT`,
  RESET_OFFER_PAGE_STORE: `RESET_OFFER_PAGE_STORE`,
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
  setFetchedOffer: (offer) => ({
    type: ActionType.SET_FETCHED_OFFER,
    payload: offer,
  }),
  resetOfferPageStore: () => ({
    type: ActionType.RESET_OFFER_PAGE_STORE,
  }),
  setUserData: (data) => ({
    type: ActionType.SET_USER_DATA,
    payload: data,
  }),
  setLoginFailed: (value) => ({
    type: ActionType.SET_LOGIN_FAILED,
    payload: value,
  }),
  setErrorMessage: (message) => ({
    type: ActionType.SET_ERROR_MESSAGE,
    payload: message,
  }),
  showAlert: (message) => ({
    type: ActionType.SHOW_ALERT,
    payload: message,
  }),
  closeAlert: () => ({
    type: ActionType.CLOSE_ALERT,
  }),
};
