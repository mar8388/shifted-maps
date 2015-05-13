var express = require('express'),
  url = require('url'),
  passport = require('../services/passport'),
  config = require('../config');

var router = express.Router();

function redirect(req, res) {
  var redirectURL = null;

  if (req.query.redirect != null)
    redirectURL = url.parse(req.query.redirect).path;

  if (redirectURL == null)
    redirectURL = '/map';

  res.redirect(redirectURL);
}

router.get('/', function(req, res, next) {
  var callbackURL = config.moves.callback_url;

  // Add redirect to query param
  if (req.query.redirect != null) {
    var callbackURLObject = url.parse(callbackURL, true);

    callbackURLObject.query.redirect = req.query.redirect;
    callbackURL = url.format(callbackURLObject);
  }

  // Authenticate
  passport.authenticate('moves', {
    callbackURL: callbackURL
  }, function(error, user) {
    if (error)
      return next(error);

    // OAuth error
    if (!user)
      return res.send(req.query.error);

    // Login user
    req.login(user, next);
  })(req, res);
}, redirect);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;