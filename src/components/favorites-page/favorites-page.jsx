import React from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';
import PageHeader from '../page-header/page-header';
import PageFooter from '../page-footer/page-footer';
import OfferCard from '../offer-card/offer-card';
import {OfferCardType} from '../../constants';

const collectOffersByCity = (offers) => {
  const offersByCity = {};

  offers.forEach((offer) => {
    const offerCity = offer.location.city.name;
    const offersInCity = offersByCity[offerCity] || [];

    offersByCity[offerCity] = [...offersInCity, offer];
  });

  return offersByCity;
};

const FavoritesPage = (props) => {
  const {offers} = props;

  const offersByCity = collectOffersByCity(offers);

  return (
    <div className="page">
      <PageHeader />
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
                      {cityOffers.map((offer) => (
                        <OfferCard
                          key={offer.id}
                          type={OfferCardType.FAVORITE}
                          offer={offer}
                        />
                      ))}
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

FavoritesPage.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default FavoritesPage;
