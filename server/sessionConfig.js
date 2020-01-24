const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuid = require('uuid/v4');
const { MONGO_CONN_STR, SESSION_KEY } = process.env;

const sessionConfig = session({
  genid: req => uuid(),
  store: new MongoStore({
    url: MONGO_CONN_STR,
    ttl: 2 * 3600, // sec
    autoRemove: 'interval', 
    autoRemoveInterval: 5, // minutes
    touchAfter: 5 * 60 // sec
  }),
  secret: SESSION_KEY,
  resave: false,
  saveUninitialized: true
});

module.exports = sessionConfig;