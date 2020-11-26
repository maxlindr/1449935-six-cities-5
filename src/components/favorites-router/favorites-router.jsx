import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import FavoritesPage from '../favorites-page/favorites-page';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

const FavoritesRouter = (props) => props.offers.length > 0
  ? <FavoritesPage {...props} />
  : <FavoritesEmpty {...props} />;

FavoritesRouter.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default FavoritesRouter;
