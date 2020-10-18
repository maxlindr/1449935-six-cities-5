export const capitalizeFirstLetter =
  ([firstLetter, ...restLetters]) => firstLetter.toUpperCase() + restLetters.join(``);

export const generateOfferPageEndpoint = (id) => `/offer/${id}`;
