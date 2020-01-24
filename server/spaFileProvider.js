const path = require('path');
const express = require('express');

const provideSpaByWebpack = (app) => {
  console.log('Webpack is on, use webpack URL to access spa files instead.');
  app.get('*', (req, res) => res.send('Webpack is on, use webpack URL to access spa files instead.'));
};

const provideSpaByNode = (app) => {
  console.log('The server will provide SPA files.');

  const staticRoot = path.resolve(path.dirname(__dirname), 'dist');

  app.use(express.static(staticRoot));

  app.get('*', (req, res, next) => {
    res.sendFile(`${staticRoot}/index.html`);
  });
}

function spaFileProvider(app) {
  (process.env.USE_WEBPACK_HOST === 'true' ? provideSpaByWebpack : provideSpaByNode)(app);
}

module.exports = spaFileProvider;