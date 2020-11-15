import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {ErrorPage} from './error-page';

const renderer = new ShallowRenderer();

const PRIORITY_MESSAGE = `I am a priority message`;
const GLOBAL_MESSAGE = `I am a global message`;

describe(`ErrorPage`, () => {
  it(`Должен отображать приоритетное сообщение`, () => {
    renderer.render(
        <ErrorPage
          message={PRIORITY_MESSAGE}
          globalMessage={GLOBAL_MESSAGE}
          close={() => {}}
        />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it(`Должен отображать глобальное сообщение`, () => {
    renderer.render(
        <ErrorPage
          message={null}
          globalMessage={GLOBAL_MESSAGE}
          close={() => {}}
        />
    );

    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
