'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Token = require('../models/Token');
const CONFIG = {};

CONFIG.jwt_encryption = 'xIMEE1vdvlvTjac1tGyiJHZusIFBtl';

module.exports = function(passport) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  //console.log(opts.jwtFromRequest);

  opts.secretOrKey = CONFIG.jwt_encryption;
  opts.passReqToCallback = true;

  passport.use(new JwtStrategy(opts, async function(req, jwt_payload, done) {
    let token = req.headers.authorization.split(' ')[1];
    let auth_token;


      auth_token = await Token.query().where('token', token).andWhere('user_id', jwt_payload.userId).eager('users').first();
      if (auth_token) {
        req.token = token;
        return done(null, auth_token.users);
      } else {
        return done(null, false);
      }

  }));
}
