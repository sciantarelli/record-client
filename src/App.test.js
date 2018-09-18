import React from 'react';
import ReactDOM from 'react-dom';
import renderAppForTesting from './renderAppForTesting';

const [,wrapper] = renderAppForTesting();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(wrapper, div);
  ReactDOM.unmountComponentAtNode(div);
});
