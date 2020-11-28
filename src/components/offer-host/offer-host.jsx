import React from 'react';
import PropTypes from 'prop-types';
import {hostPropTypes} from '../../prop-types/prop-types';

function OfferHost(props) {
  const {host, description} = props;

  const avatarWrapperClassname = host.super
    ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper`
    : `property__avatar-wrapper user__avatar-wrapper`;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={avatarWrapperClassname}>
          <img
            className="property__avatar user__avatar"
            src={host.avatar}
            alt="Host avatar"
            width={74}
            height={74}
          />
        </div>
        <span className="property__user-name">{host.name}</span>
      </div>
      <div className="property__description">
        {description.split(`\n`).map((paragraph, i) => (
          <p key={i} className="property__text">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

OfferHost.propTypes = {
  host: hostPropTypes.isRequired,
  description: PropTypes.string.isRequired
};

export {OfferHost};
export default React.memo(OfferHost);
