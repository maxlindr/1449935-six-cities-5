import React from 'react';
import PropTypes from 'prop-types';

const MAX_PHOTOS_COUNT = 6;

function OfferGallery(props) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {props.photos.slice(0, MAX_PHOTOS_COUNT).map((url, i) => (
          <div key={url + i} className="property__image-wrapper">
            <img className="property__image" src={url} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

OfferGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default React.memo(OfferGallery);
