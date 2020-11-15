import React from 'react';
import renderer from 'react-test-renderer';
import {BookmarkToggle, BookmarkToggleType} from './bookmark-toggle';

describe(`BookmarkToggle`, () => {
  it(`должен корректно отображаться при передаче ему active=false, type=BookmarkToggleType.CARD`, () => {
    const component = renderer.create(
        <BookmarkToggle
          active={false}
          type={BookmarkToggleType.CARD}
          onToggle={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`должен корректно отображаться при передаче ему active=false, type=BookmarkToggleType.OFFER`, () => {
    const component = renderer.create(
        <BookmarkToggle
          active={false}
          type={BookmarkToggleType.OFFER}
          onToggle={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`должен корректно отображаться при передаче ему active=true, type=BookmarkToggleType.CARD`, () => {
    const component = renderer.create(
        <BookmarkToggle
          active={true}
          type={BookmarkToggleType.CARD}
          onToggle={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`должен корректно отображаться при передаче ему active=true, type=BookmarkToggleType.OFFER`, () => {
    const component = renderer.create(
        <BookmarkToggle
          active={true}
          type={BookmarkToggleType.OFFER}
          onToggle={() => {}}
        />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

