'use strict';

// Require dependencies.
const bodyParser = require('body-parser');
const express = require('express');

// Load routes.
const apiRoutes = require('./routes/api-routes');

/**
 * Configure the express application.
 */
module.exports = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use('/api', apiRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};


