import React from 'react';
import PropTypes from 'prop-types';

const MAX_PHOTOS_COUNT = 6;

function OfferGallery({photos}) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {photos.slice(0, MAX_PHOTOS_COUNT).map((url, i) => (
          <div key={url + i} className="property__image-wrapper">
            <img
              className="property__image"
              alt="Photo studio"
              src={url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

OfferGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired
};

export {OfferGallery};
export default React.memo(OfferGallery);
