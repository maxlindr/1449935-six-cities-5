import React from 'react';
import PropTypes from 'prop-types';
import {userPropTypes, offerPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import FavoritesOfferCard from '../favorites-offer-card/favorites-offer-card';
import PageFooter from '../page-footer/page-footer';

const collectOffersByCity = (offers) => {
  const offersByCity = {};

  offers.forEach((offer) => {
    const offerCity = offer.location.city.name;
    const offersInCity = offersByCity[offerCity] || [];

    offersByCity[offerCity] = [...offersInCity, offer];
  });

  return offersByCity;
};

const Favorites = (props) => {
  const {offers, user} = props;

  const offersByCity = collectOffersByCity(offers);

  return (
    <div className="page">
      <PageHeader user={user}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Object.entries(offersByCity).map(([city, cityOffers]) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOffers.map((offer) => <FavoritesOfferCard key={offer.id} offer={offer} />)}
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      </main>
      <PageFooter container/>
    </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  user: userPropTypes
};

export default Favorites;
