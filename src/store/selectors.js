import {createSelector} from 'reselect';
import {StateNameSpace} from './reducers/root-reducer';

export const getOffers = (state) => state[StateNameSpace.DATA].offers;
export const getCities = (state) => state[StateNameSpace.DATA].cities;
export const getCurrentCityName = (state) => state[StateNameSpace.DATA].currentCity;
export const getOfferById = (state, id) => getOffers(state).find((offer) => offer.id === id);
export const getUser = (state) => state[StateNameSpace.USER].user;
export const getAuthorizationStatus = (state) => state[StateNameSpace.USER].authorizationStatus;
export const getErrorMessage = (state) => state[StateNameSpace.ERROR_PAGE].message;
export const getAlertMessage = (state) => state[StateNameSpace.APP].alertMessage;

export const getIsLoginFailedWithUnauthorized = (state) =>
  state[StateNameSpace.LOGIN_PROCESSING].isLoginFailedWithUnauthorized;

export const getCurrentCity = createSelector(
    getCities, getCurrentCityName,
    (cities, currentCityName) => cities.find((city) => city.name === currentCityName)
);

export const getCurrentCityOffers = createSelector(
    [getOffers, getCurrentCity],
    (offers, currentCity) => offers.filter((offer) => offer.location.city.name === currentCity.name)
);

export const getFavoriteOffers = createSelector(
    getOffers,
    (offers) => offers.filter((offer) => offer.favorite)
);

const getNearbyPlacesIds = (state) => state[StateNameSpace.OFFER_PAGE].nearbyPlaces;

export const getNearbyOffers = createSelector(
    [getOffers, getNearbyPlacesIds],
    (offers, ids) => ids
      ? ids.map((id) => offers.find((offer) => offer.id === id))
      : null
);
