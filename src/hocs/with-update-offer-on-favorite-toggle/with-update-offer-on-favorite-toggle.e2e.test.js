import React from 'react';
import {shallow} from 'enzyme';
import {withUpdateOfferOnFavoriteToggle} from './with-update-offer-on-favorite-toggle';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div />;
const MockComponentWrapped = withUpdateOfferOnFavoriteToggle(MockComponent);

let wrapper;
let updateOffer;
let onUpdate;

beforeEach(() => {
  updateOffer = jest.fn().mockImplementation(() => Promise.resolve());
  onUpdate = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        offer={offer}
        updateOffer={updateOffer}
        onUpdate={onUpdate}
      />
  );
});

const offerWithInversedFavoriteState = Object.assign({}, offer, {
  favorite: !offer.favorite
});

describe(`withUpdateOfferOnFavoriteToggle`, () => {
  it(`должен вызывать updateOffer при вызове onToggle`, () => {
    wrapper.props().onToggle();
    expect(updateOffer).toHaveBeenNthCalledWith(1, offerWithInversedFavoriteState);
  });

  it(`должен вызывать onUpdate при вызове onToggle`, () => {
    return wrapper
      .props()
      .onToggle()
      .then(() =>
        expect(onUpdate).toHaveBeenNthCalledWith(1, offerWithInversedFavoriteState)
      );
  });
});
