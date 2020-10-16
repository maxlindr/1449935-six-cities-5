import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
});
