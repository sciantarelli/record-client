import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import createAppStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const store = createAppStore( window.REDUX_STATE || {} );

ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
