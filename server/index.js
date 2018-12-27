import express from 'express';
import serverRenderer from './middleware/renderer';
import Loadable from 'react-loadable';

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

// Everything else should be handled by React
router.use('*', serverRenderer);

// tell the app to use the above rules
app.use(router);

Loadable.preloadAll().then(() => {
  // start the app
  app.listen(PORT, (error) => {
    if (error) {
      return console.log('Server Error: ', error);
    }

    console.log("listening on " + PORT + "...");
  });
});

