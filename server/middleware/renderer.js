import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../src/store';
import App from '../../src/components/App';

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.path} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
    );

    // inject the rendered app into our html and send it
    return res.send(
        htmlData.replace(
            '<div id="root"></div>',
            `<div id="root">${content}</div>`
        )
    );
  });
}