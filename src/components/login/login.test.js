import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Login} from './login';

const renderer = new ShallowRenderer();

test(`Login должен корректно отображаться`, () => {
  renderer.render(
      <Login
        email={`Oliver.conner@gmail.com`}
        password={`123456`}
        isValid={true}
        isDisabled={false}
        isAnimationPlaying={false}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onSubmit={() => {}}
      />
  );

  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
