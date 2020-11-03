import PropTypes from 'prop-types';
import cityPropTypes from './city-prop-types';
import hostPropTypes from './host-prop-types';
import {validateRating} from './utils';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  premium: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
  rating: validateRating,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: hostPropTypes,
  location: PropTypes.shape({
    city: cityPropTypes.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  favorite: PropTypes.bool.isRequired,
});
