import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { createServerStore } from '../../src/store';
import App from '../../src/components/App';
import manifest from '../../build/asset-manifest.json'; // import the manifest generated with the create-react-app build

// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {
  const store = createServerStore();

  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    let modules = [];

    const content = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.originalUrl} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );

    // console.log(modules);

    const reduxState = JSON.stringify(store.getState());
    const extraChunks = extractAssets(manifest, modules)
        .map(c => `<script type="text/javascript" src="/${c}"></script>`);

    // console.log(extraChunks);

    // inject the rendered app into our html and send it
    return res.send(
        htmlData
            .replace(
                '<div id="root"></div>',
                `<div id="root">${content}</div>`
            )
            .replace('"__SERVER_REDUX_STATE__"', reduxState)
            .replace('</body>', extraChunks.join('') + '</body>')
    );
  });
}