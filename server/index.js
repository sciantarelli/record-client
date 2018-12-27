import express from 'express';
import serverRenderer from './middleware/renderer';
import expressStaticGzip from 'express-static-gzip';

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer);

// This was the old way of serving static assets, before gzip below
// router.use(express.static(
//     path.resolve(__dirname, '..', 'build'),
//     { maxAge: '30d' },
// ));

// other static resources should just be served as they are
router.use(expressStaticGzip("build", { maxAge: '30d' })); // TODO: Determine whether a maxAge is appropriate here at all

// Everything else should be handled by React
router.use('*', serverRenderer);

// tell the app to use the above rules
app.use(router);

// start the app
app.listen(PORT, (error) => {
  if (error) {
    return console.log('something bad happened', error);
  }

  console.log("listening on " + PORT + "...");
});