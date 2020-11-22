import React from 'react';
import {shallow} from 'enzyme';
import {withHooks} from 'jest-react-hooks-shallow';
import {withExtraOfferData} from './with-extra-offer-data';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div />;
const MockComponentWrapped = withExtraOfferData(MockComponent);

let wrapper;
let getReviews;
let getNearbyPlaces;
let getOffer;
let changeCity;
let updateOffer;

beforeEach(() => {
  getReviews = jest.fn();
  getNearbyPlaces = jest.fn();
  getOffer = jest.fn();
  changeCity = jest.fn();
  updateOffer = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        offerId={`1`}
        getReviews={getReviews}
        getNearbyPlaces={getNearbyPlaces}
        reset={() => {}}
        getOffer={getOffer}
        changeCity={changeCity}
        updateOffer={updateOffer}
      />
  );
});

describe(`withExtraOfferData`, () => {
  it(`должен вызывать при загрузке getOffer с аргументом в виде offer id`, () => {
    withHooks(() => {
      wrapper = shallow(
          <MockComponentWrapped
            offerId={`1`}
            getReviews={getReviews}
            getNearbyPlaces={getNearbyPlaces}
            reset={() => {}}
            getOffer={getOffer}
            changeCity={changeCity}
            updateOffer={updateOffer}
          />
      );
    });

    expect(getOffer).toHaveBeenCalledTimes(1);
  });

  describe(`при появлении пропа offer`, () => {
    const setOfferProp = () => wrapper.setProps({offer});

    it(`должен вызывать changeCity с аргументом в виде названия города`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(changeCity).toHaveBeenNthCalledWith(1, offer.location.city.name);
    });

    it(`должен вызывать getReviews с аргументом в виде offer id`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(getReviews).toHaveBeenNthCalledWith(1, offer.id);
    });

    it(`должен вызывать getNearbyPlaces с аргументом в виде offer id`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(getNearbyPlaces).toHaveBeenNthCalledWith(1, offer.id);
    });
  });

  describe(`при отсутствии пропа offer`, () => {
    const setOfferPropUndefined = () => wrapper.setProps({offer: undefined});

    it(`не должен вызывать changeCity`, () => {
      setOfferPropUndefined();
      expect(changeCity).not.toHaveBeenCalled();
    });

    it(`не должен вызывать getReviews`, () => {
      setOfferPropUndefined();
      expect(getReviews).not.toHaveBeenCalled();
    });

    it(`не должен вызывать getNearbyPlaces`, () => {
      setOfferPropUndefined();
      expect(getNearbyPlaces).not.toHaveBeenCalled();
    });
  });

  it(`должен вызывать updateOffer при вызове onUpdate`, () => {
    wrapper.setProps({offer});

    const newOffer = Object.assign({}, {
      favorite: !offer.favorite
    });

    wrapper.props().onUpdate(newOffer);
    expect(updateOffer).toHaveBeenNthCalledWith(1, newOffer);
  });
});
