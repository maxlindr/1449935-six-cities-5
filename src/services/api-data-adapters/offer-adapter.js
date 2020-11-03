export const adaptOfferToClient = (offer) => {
  const {id, bedrooms, city, description, goods, host, images, is_favorite: favorite, is_premium: premium,
    location, max_adults: maxAdults, preview_image: thumbnail, price, rating, title, type} = offer;

  const {avatar_url: hostAvatar, id: hostId, is_pro: hostPro, name: hostName} = host;
  const {latitude, longitude, zoom} = location;
  const {name: cityName, location: cityLocation} = city;

  return {
    id: String(id),
    thumbnail,
    photos: images,
    title,
    description,
    premium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    features: goods,
    host: {
      id: hostId,
      avatar: hostAvatar,
      name: hostName,
      super: hostPro
    },
    location: {
      city: {
        name: cityName,
        coordinates: [cityLocation.latitude, cityLocation.longitude],
        zoom: cityLocation.zoom
      },
      coordinates: [latitude, longitude],
      zoom
    },
    favorite,
  };
};

export const adaptOffersToClient = (offers) => offers.map(adaptOfferToClient);

export default {
  toClient: adaptOfferToClient,
  arrayToClient: adaptOffersToClient
};
