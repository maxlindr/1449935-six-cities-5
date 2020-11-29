export const OfferCardType = {
  FAVORITE: `favorite`,
  NEAR_PLACE: `near_place`,
  CITIES: `cities`
};

export const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`
};

export const AuthorizationStatus = {
  NOT_AUTHORIZED: `NOT_AUTHORIZED`,
  AUTHORIZED: `AUTHORIZED`,
  PENDING: `PENDING`
};

export const AppRoute = {
  LOGIN: `/login`,
  ROOT: `/`,
  FAVORITES: `/favorites`,
  ERROR: `/error`,
  OFFER: `/offer/:id`,
};

export const APIRoute = {
  OFFERS: `/hotels`,
  LOGIN: `/login`,
  FAVORITE: `/favorite`
};

export const HttpCode = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const ErrorMessage = {
  NOT_FOUND: `Resource not found`,
  GENERAL: `Oops! Something went wrong`,
  UNAUTHORIZED: `Unauthorized`,
};
