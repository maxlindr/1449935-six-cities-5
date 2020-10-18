import PropTypes from 'prop-types';

export default PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  super: PropTypes.bool.isRequired
});
