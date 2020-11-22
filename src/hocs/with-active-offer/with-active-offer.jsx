import React from 'react';

const withActiveOffer = (Component) => {
  const WithActiveOffer = (props) => {
    const [activeOffer, setActiveOffer] = React.useState(null);
    const handleActivate = React.useCallback((offer) => setActiveOffer(offer), []);
    const handleDeactivate = React.useCallback(() => setActiveOffer(null), []);

    return (
      <Component
        {...props}
        activeOffer={activeOffer}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
      />
    );
  };

  WithActiveOffer.propTypes = {
  };

  return WithActiveOffer;
};

export default withActiveOffer;
