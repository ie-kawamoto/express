var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function (req, res, next) {
  request({
    url: 'https://api.qrserver.com/v1/create-qr-code/',
    qs: {
      size: '150x150',
      data: req.query.data || 'Example'
    },
    encoding: null
  }, function (error, response, body) {
    if (error) {
      return next(error);
    }
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).send('no-image');
    }
    res.type('png');
    res.send(body);
  });
});

module.exports = router;
