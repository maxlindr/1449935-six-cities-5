export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  UPDATE_LOCAL_OFFERS: `UPDATE_LOCAL_OFFERS`,
  UPDATE_OFFER: `UPDATE_OFFER`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  updateLocalOffers: (offers, cityName) => ({
    type: ActionType.UPDATE_LOCAL_OFFERS,
    payload: offers.filter((offer) => offer.location.city.name === cityName)
  }),
  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer
  }),
};
