import React from 'react';
import PropTypes from 'prop-types';

export const BookmarkToggleType = {
  OFFER: `property`,
  CARD: `place-card`
};

const bookmarkSize = {
  [BookmarkToggleType.OFFER]: {width: 31, height: 33},
  [BookmarkToggleType.CARD]: {width: 18, height: 19},
};

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

BookmarkToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    BookmarkToggleType.OFFER,
    BookmarkToggleType.CARD
  ]).isRequired
};

export default BookmarkToggle;
