const MAX_RATING = 5;

export const convertRatingToPerc = (rating) => (rating / MAX_RATING) * 100;

export const capitalizeFirstLetter =
  ([firstLetter, ...restLetters]) => firstLetter.toUpperCase() + restLetters.join(``);

export const generateOfferPageEndpoint = (id) => `/offer/${id}`;
