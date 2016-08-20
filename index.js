var express    = require('express');
var Webtask    = require('webtask-tools');
var app        = express();
var api        = express.Router();
var jwtExpress = require('express-jwt');
var auth0      = require('auth0-oauth2-express');
var metadata   = require('./webtask.json');
var template = require('./templates/index.jade');

app.use(require('./middleware/develop.js'));

app.use('/api', api);

app.use(auth0({
  scopes: 'read:connections read:clients read:rules',
  apiToken: {
    payload: function (req, res, next) {
      // Add extra info to the API token
      req.userInfo.MoreInfo = "More Info";
      next();
    },
    secret: function (req) {
      return req.webtaskContext.data.EXTENSION_SECRET;
    }
  }
}));

app.get('/', function (req, res) {
    res.header("Content-Type", 'text/html');
    res.status(200).send(template({
        baseUrl: res.locals.baseUrl
    }));
});

// This endpoint would be called by webtask-gallery to dicover your metadata
app.get('/meta', function (req, res) {
  res.status(200).send(metadata);
});

////////////// API //////////////
api.use(jwtExpress({
  secret: function(req, payload, done) {
    done(null, req.webtaskContext.data.EXTENSION_SECRET);
  }
}));

api.get('/secured', function (req, res) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  res.status(200).send({user: req.user});
});
////////////// API //////////////

module.exports = app;
