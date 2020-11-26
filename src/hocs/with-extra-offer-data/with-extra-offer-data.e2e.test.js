import React from 'react';
import {shallow} from 'enzyme';
import {withHooks} from 'jest-react-hooks-shallow';
import {withExtraOfferData} from './with-extra-offer-data';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div />;
const MockComponentWrapped = withExtraOfferData(MockComponent);

let wrapper;
let onFetchReviews;
let onFetchNearbyPlaces;
let onFetchOffer;
let onChangeCity;
let onUpdateOffer;

beforeEach(() => {
  onFetchReviews = jest.fn();
  onFetchNearbyPlaces = jest.fn();
  onFetchOffer = jest.fn();
  onChangeCity = jest.fn();
  onUpdateOffer = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        offerId={`1`}
        onFetchReviews={onFetchReviews}
        onFetchNearbyPlaces={onFetchNearbyPlaces}
        onReset={() => {}}
        onFetchOffer={onFetchOffer}
        onChangeCity={onChangeCity}
        onUpdateOffer={onUpdateOffer}
      />
  );
});

describe(`withExtraOfferData`, () => {
  it(`должен вызывать при загрузке onFetchOffer с аргументом в виде offer id`, () => {
    withHooks(() => {
      wrapper = shallow(
          <MockComponentWrapped
            offerId={`1`}
            onFetchReviews={onFetchReviews}
            onFetchNearbyPlaces={onFetchNearbyPlaces}
            onReset={() => {}}
            onFetchOffer={onFetchOffer}
            onChangeCity={onChangeCity}
            onUpdateOffer={onUpdateOffer}
          />
      );
    });

    expect(onFetchOffer).toHaveBeenCalledTimes(1);
  });

  describe(`при появлении пропа offer`, () => {
    const setOfferProp = () => wrapper.setProps({offer});

    it(`должен вызывать onChangeCity с аргументом в виде названия города`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(onChangeCity).toHaveBeenNthCalledWith(1, offer.location.city.name);
    });

    it(`должен вызывать onFetchReviews с аргументом в виде offer id`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(onFetchReviews).toHaveBeenNthCalledWith(1, offer.id);
    });

    it(`должен вызывать onFetchNearbyPlaces с аргументом в виде offer id`, () => {
      withHooks(() => {
        setOfferProp();
      });

      expect(onFetchNearbyPlaces).toHaveBeenNthCalledWith(1, offer.id);
    });
  });

  describe(`при отсутствии пропа offer`, () => {
    const setOfferPropUndefined = () => wrapper.setProps({offer: undefined});

    it(`не должен вызывать onChangeCity`, () => {
      setOfferPropUndefined();
      expect(onChangeCity).not.toHaveBeenCalled();
    });

    it(`не должен вызывать onFetchReviews`, () => {
      setOfferPropUndefined();
      expect(onFetchReviews).not.toHaveBeenCalled();
    });

    it(`не должен вызывать onFetchNearbyPlaces`, () => {
      setOfferPropUndefined();
      expect(onFetchNearbyPlaces).not.toHaveBeenCalled();
    });
  });

  it(`должен вызывать onUpdateOffer при вызове onUpdate`, () => {
    wrapper.setProps({offer});

    const newOffer = Object.assign({}, {
      favorite: !offer.favorite
    });

    wrapper.props().onUpdate(newOffer);
    expect(onUpdateOffer).toHaveBeenNthCalledWith(1, newOffer);
  });
});
