// configs/session.js

import session from "express-session";
import mongoStore from "connect-mongo";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: mongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    touchAfter: 24 * 3600,
  }),
});

export default sessionConfig;
