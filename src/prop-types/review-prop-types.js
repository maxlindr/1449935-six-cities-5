import PropTypes from 'prop-types';
import {validateRating} from './utils';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  rating: validateRating,
  date: PropTypes.instanceOf(Date),
  text: PropTypes.string.isRequired
});
