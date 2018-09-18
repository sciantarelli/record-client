import React from 'react';
import { mount } from 'enzyme';
import App from './components/App';
import { Provider } from 'react-redux';
import { createClientStore } from './store';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

function renderAppForTesting(state) {
  const history = createBrowserHistory();
  const store = createClientStore(state, history);

  const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
  );

  return [store, wrapper];
}

export default renderAppForTesting;