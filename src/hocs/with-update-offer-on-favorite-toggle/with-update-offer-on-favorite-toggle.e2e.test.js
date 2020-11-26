import React from 'react';
import {shallow} from 'enzyme';
import {withUpdateOfferOnFavoriteToggle} from './with-update-offer-on-favorite-toggle';
import offer from '../../../__mocks__/offer-mock';

const MockComponent = () => <div />;
const MockComponentWrapped = withUpdateOfferOnFavoriteToggle(MockComponent);

let wrapper;
let onUpdateOffer;
let onUpdate;

beforeEach(() => {
  onUpdateOffer = jest.fn().mockImplementation(() => Promise.resolve());
  onUpdate = jest.fn();

  wrapper = shallow(
      <MockComponentWrapped
        offer={offer}
        onUpdateOffer={onUpdateOffer}
        onUpdate={onUpdate}
      />
  );
});

const offerWithInversedFavoriteState = Object.assign({}, offer, {
  favorite: !offer.favorite
});

describe(`withUpdateOfferOnFavoriteToggle`, () => {
  it(`должен вызывать onUpdateOffer при вызове onToggle`, () => {
    wrapper.props().onToggle();
    expect(onUpdateOffer).toHaveBeenNthCalledWith(1, offerWithInversedFavoriteState);
  });
});
