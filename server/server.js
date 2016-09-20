'use strict';

require('dotenv').config();

const app = require('./src/express')();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT} running in ${process.env.APP_ENV} mode.`);
});

