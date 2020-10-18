import React from 'react';
import PropTypes from 'prop-types';

function OfferGallery(props) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {props.photos.map((url, i) => (
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

export default OfferGallery;
