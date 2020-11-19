import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {Login} from './login';

const mockStore = configureStore([]);

const store = mockStore({
  USER: {
    user: null
  }
});

describe(`Alert`, () => {
  it(`Клик на кнопку Sign In вызывает колбек onSubmit`, () => {
    const onSubmit = jest.fn();

    const wrapper = mount(
        <BrowserRouter>
          <Provider store={store}>
            <Login
              email={`Oliver.conner@gmail.com`}
              password={`123456`}
              isValid={true}
              isDisabled={false}
              isAnimationPlaying={false}
              onEmailChange={() => {}}
              onPasswordChange={() => {}}
              onSubmit={onSubmit}
            />
          </Provider>
        </BrowserRouter>
    );

    wrapper.find(`button`).simulate(`submit`);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
