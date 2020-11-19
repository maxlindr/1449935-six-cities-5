export const replaceOffer = (offers, replacementOffer) => {
  const offersCopy = offers.slice();
  const targetOfferIndex = offersCopy.findIndex((item) => item.id === replacementOffer.id);
  offersCopy[targetOfferIndex] = replacementOffer;
  return offersCopy;
};

export const getCitiesLocationData = (offers, orderedCityNames) => {
  const citiesLocationData = new Map();

  for (const offer of offers) {
    const cityName = offer.location.city.name;

    if (citiesLocationData.has(cityName)) {
      continue;
    }

    citiesLocationData.set(cityName, {
      name: cityName,
      coordinates: offer.location.city.coordinates,
      zoom: offer.location.city.zoom
    });

    if (citiesLocationData.size === orderedCityNames.length) {
      break;
    }
  }

  return orderedCityNames
    .map((city) => citiesLocationData.get(city))
    .filter((obj) => obj);
};
