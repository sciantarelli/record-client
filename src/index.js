import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import { createClientStore } from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';

const history = createBrowserHistory();
const store = createClientStore((window.REDUX_STATE || {}), history );

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
  });
};

registerServiceWorker();