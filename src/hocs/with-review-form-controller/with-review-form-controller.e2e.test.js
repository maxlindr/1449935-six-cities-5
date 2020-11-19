import React from 'react';
import {shallow} from 'enzyme';
import {withReviewFormController} from './with-review-form-controller';

const MockComponent = () => <div />;
const MockComponentWrapped = withReviewFormController(MockComponent);

const OFFER_ID = `1`;
let wrapper;
let postComment;

const createEvent = (value) => ({
  target: {
    value
  },
  preventDefault: () => {}
});

beforeEach(() => {
  postComment = jest.fn().mockImplementation(() => Promise.resolve());

  wrapper = shallow(
      <MockComponentWrapped
        offerId={OFFER_ID}
        postComment={postComment}
      />
  );
});

describe(`withReviewFormController`, () => {
  it(`должен быть разблокирован если проп isPending=false`, () => {
    expect(wrapper.props().disabled).toEqual(false);
  });

  it(`должен быть заблокирован если проп isPending=true`, () => {
    postComment = jest.fn().mockImplementation(() => new Promise());
    wrapper.props().onSubmit(createEvent());
    expect(wrapper.props().disabled).toEqual(true);
  });

  it(`должен при вызове onSubmit вызвать postComment с данными в аргументах`, () => {
    const TEXT = `text`;
    const RATING = 5;

    const comment = {
      text: TEXT,
      rating: RATING
    };

    wrapper.props().onTextChange(createEvent(TEXT));
    wrapper.props().onRatingClick(createEvent(RATING));
    wrapper.props().onSubmit(createEvent());
    expect(postComment).toHaveBeenNthCalledWith(1, OFFER_ID, comment);
  });

  describe(`Валидация`, () => {
    it(`должен установить проп isValid=true при валидных данных`, () => {
      wrapper.props().onRatingClick(createEvent(5));
      wrapper.props().onTextChange(createEvent(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`));
      expect(wrapper.props().isValid).toEqual(true);
    });

    it(`должен установить проп isValid=false при невалидном тексте`, () => {
      // меньше 50 символов
      const TOO_SHORT_TEXT = `Text`;
      // больше 300 символов
      const TOO_LONG_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ante felis, aliquet sed facilisis id, aliquam et sapien. Integer quis porttitor nulla, ut hendrerit eros. Pellentesque eu elit in ipsum convallis mattis vitae ac magna. Nulla nibh magna, accumsan quis eros et, varius laoreet quam blandit.`;

      wrapper.props().onRatingClick(createEvent(5));

      wrapper.props().onTextChange(createEvent(``));
      expect(wrapper.props().isValid).toEqual(false);

      wrapper.props().onTextChange(createEvent(TOO_SHORT_TEXT));
      expect(wrapper.props().isValid).toEqual(false);

      wrapper.props().onTextChange(createEvent(TOO_LONG_TEXT));
      expect(wrapper.props().isValid).toEqual(false);
    });
  });
});
