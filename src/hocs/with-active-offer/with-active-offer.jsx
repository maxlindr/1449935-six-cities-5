import React from 'react';
import PropTypes from 'prop-types';
import offerPropTypes from '../../prop-types/offer-prop-types';

const withActiveOffer = (Component) => {
  class WithActiveOffer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeOffer: null};

      this.handleActivate = this.handleActivate.bind(this);
      this.handleDeactivate = this.handleDeactivate.bind(this);
    }

    handleActivate(activeOffer) {
      this.setState({activeOffer});
    }

    handleDeactivate() {
      this.setState({activeOffer: null});
    }

    render() {
      return (
        <Component
          {...this.props}
          activeOffer={this.state.activeOffer}
          onActivate={this.handleActivate}
          onDeactivate={this.handleDeactivate}
        />
      );
    }
  }

  WithActiveOffer.propTypes = {
    offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  };

  return WithActiveOffer;
};

export default withActiveOffer;
