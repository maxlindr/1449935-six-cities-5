import React from 'react';
import PropTypes from 'prop-types';

const BookmarkToggle = (props) => {
  const {active, type} = props;

  const bookmarkBtnClassname = active
    ? `${type}__bookmark-button ${type}__bookmark-button--active button`
    : `${type}__bookmark-button button`;

  const {width, height} = bookmarkSize[type];

  return (
    <button className={bookmarkBtnClassname} type="button">
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>

      <span className="visually-hidden">
        {active ? `In bookmarks` : `To bookmarks`}
      </span>
    </button>
  );
};

BookmarkToggle.TYPE_OFFER = `property`;
BookmarkToggle.TYPE_CARD = `place-card`;

const bookmarkSize = {
  [BookmarkToggle.TYPE_OFFER]: {width: 31, height: 33},
  [BookmarkToggle.TYPE_CARD]: {width: 18, height: 19},
};

BookmarkToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    BookmarkToggle.TYPE_OFFER,
    BookmarkToggle.TYPE_CARD
  ]).isRequired
};

export default BookmarkToggle;
