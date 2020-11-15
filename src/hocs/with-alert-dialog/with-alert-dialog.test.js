import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import withAlertDialogConnected, {withAlertDialog} from './with-alert-dialog';
import {StateNameSpace} from '../../store/reducers/root-reducer';

const mockStore = configureStore([]);
let store;

const MockComponent = () => <div>Mock component</div>;
const MockComponentWrapped = withAlertDialog(MockComponent);
const MockComponentWrappedConnected = withAlertDialogConnected(MockComponent);

describe(`withAlertDialog`, () => {
  const MESSAGE_PROP_NAME = `alertDialogMessage`;

  describe(`Не подключенный к store`, () => {
    it(`не должен добавлять компонент Alert при отсутствии пропа ${MESSAGE_PROP_NAME}`, () => {
      const tree = renderer.create((
        <MockComponentWrapped closeAlertDialog={() => {}}/>
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`должен добавлять компонент Alert при наличии пропа ${MESSAGE_PROP_NAME}`, () => {
      const tree = renderer.create((
        <MockComponentWrapped
          alertDialogMessage={`Message`}
          closeAlertDialog={() => {}}
        />
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`Подключенный к store`, () => {
    const MESSAGE_STORE_KEYS_CHAIN = `store.${StateNameSpace.APP}.alertMessage`;

    it(`не должен добавлять компонент Alert при отсутствии данных в ${MESSAGE_STORE_KEYS_CHAIN}`, () => {
      store = mockStore({
        [StateNameSpace.APP]: {
          alertMessage: null,
        }
      });

      const tree = renderer.create((
        <Provider store={store}>
          <MockComponentWrappedConnected />
        </Provider>
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`должен добавлять компонент Alert при наличии данных в ${MESSAGE_STORE_KEYS_CHAIN}`, () => {
      store = mockStore({
        [StateNameSpace.APP]: {
          alertMessage: `Message`
        }
      });

      const tree = renderer.create((
        <Provider store={store}>
          <MockComponentWrappedConnected />
        </Provider>
      )).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
