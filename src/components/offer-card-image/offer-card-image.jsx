import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import {OfferCardType} from '../../constants';
import {generateOfferPageEndpoint} from '../offer-card-utils';

const PREMIUM_MARK_ELEMENT = (
  <div className="place-card__mark">
    <span>Premium</span>
  </div>
);

const resolveImageWrapperClassname = (cardType) => {
  switch (cardType) {
    case OfferCardType.FAVORITE:
      return `favorites__image-wrapper place-card__image-wrapper`;
    case OfferCardType.NEAR_PLACE:
      return `near-places__image-wrapper place-card__image-wrapper`;
    case OfferCardType.CITIES:
      return `cities__image-wrapper place-card__image-wrapper`;
    default:
      throw new Error(`Unrecognized card type`);
  }
};

const OfferCardImage = (props) => {
  const {cardType, offer} = props;
  const {id, thumbnail, photos, premium} = offer;

  const image = (cardType === OfferCardType.FAVORITE) ? thumbnail : photos[0];

  const imageSize = (cardType === OfferCardType.FAVORITE)
    ? {width: 150, height: 110}
    : {width: 260, height: 200};

  return (
    <React.Fragment>
      {premium ? PREMIUM_MARK_ELEMENT : null}

      <div className={resolveImageWrapperClassname(cardType)}>
        <Link to={generateOfferPageEndpoint(id)}>
          <img
            className="place-card__image"
            src={image}
            alt="Place image"
            width={imageSize.width}
            height={imageSize.height}
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

OfferCardImage.propTypes = {
  offer: offerPropTypes.isRequired,
  cardType: PropTypes.oneOf([
    OfferCardType.FAVORITE,
    OfferCardType.NEAR_PLACE,
    OfferCardType.CITIES
  ]),
};

export default OfferCardImage;
