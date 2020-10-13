import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';
import OfferCard from '../offer-card/offer-card';

class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeOffer: null};

    this.onCardMouseOver = this.onCardMouseOver.bind(this);
    this.onCardMouseLeave = this.onCardMouseLeave.bind(this);
  }

  onCardMouseOver(activeOffer) {
    this.setState({activeOffer});
  }

  onCardMouseLeave() {
    this.setState({activeOffer: null});
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this.props.offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onMouseOver={this.onCardMouseOver}
            onMouseLeave={this.onCardMouseLeave}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
};

export default OffersList;
