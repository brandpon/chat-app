const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const path = require('path');
const fs = require('fs');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

var cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies){
    token = req.cookies['jwt'];
    // console.log(token);
  }
  return token;
};

// Site isn't https, doesn't work?
var cookieExtractorSigned = function (req) {
    let token = null;
    if (req && req.signedCookies && req.signedCookies.jwt) {

        token = req.signedCookies['jwt']['token'];
        // console.log(token);
    }

    return token;
};

// Change secret key later
var options = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor, cookieExtractorSigned]),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}


// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {

    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {

        // Since we are here, the JWT is valid!

        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({_id: jwt_payload.sub}, function(err, user) {

            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }

            if (user) {
                // Since we are here, the JWT is valid and our user is valid, so we are authorized!
                return done(null, user);

            } else {
                return done(null, false);
            }

        });

    }));
}
