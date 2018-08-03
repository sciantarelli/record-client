import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
import App from './components/App';
import { createClientStore } from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

const history = createHistory();
const store = createClientStore((window.REDUX_STATE || {}), history );

ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
