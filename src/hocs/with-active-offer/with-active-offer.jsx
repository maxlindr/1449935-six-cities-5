import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';

const withActiveOffer = (Component) => {

  class WithActiveOffer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeOffer: null};

      this.handleCardMouseOver = this.handleCardMouseOver.bind(this);
      this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
    }

    handleCardMouseOver(activeOffer) {
      this.setState({activeOffer});
    }

    handleCardMouseLeave() {
      this.setState({activeOffer: null});
    }

    render() {
      return (
        <Component
          offers={this.props.offers}
          onActivate={this.handleCardMouseOver}
          onDeactivate={this.handleCardMouseLeave}
        />
      );
    }
  }

  WithActiveOffer.propTypes = {
    offers: PropTypes.arrayOf(offerPropTypes).isRequired,
    onActivate: PropTypes.func.isRequired,
    onDeactivate: PropTypes.func.isRequired,
  };

  return WithActiveOffer;
};


export default withActiveOffer;
