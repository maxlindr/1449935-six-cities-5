import PropTypes from 'prop-types';
import {validateRating} from './utils';

const HOST_PROP_TYPE = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  super: PropTypes.bool.isRequired
});

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  premium: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
  rating: validateRating,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: HOST_PROP_TYPE,
  location: PropTypes.shape({
    city: PropTypes.string.isRequired
  }),
  nearPlaces: PropTypes.arrayOf(PropTypes.string).isRequired,
  favorite: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.string).isRequired
});
