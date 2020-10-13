const RATING_MIN = 0;
const RATING_MAX = 5;

export const validateRating = (props, propName) => {
  const value = props[propName];

  if (value === undefined || value === null) {
    return new TypeError(`'${propName}' is missing`);
  }

  if (typeof value !== `number`) {
    return new TypeError(`${propName}. Invalid type.`);
  }

  if (value < RATING_MIN || value > RATING_MAX) {
    return new TypeError(`${propName}. Value ${value} is out of range.`);
  }

  return null;
};
