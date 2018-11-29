var express = require('express');
var router = express.Router();

var secured = function () {
    return function secured (req, res, next) {
      if (req.user) { return next(); }
      req.session.returnTo = req.originalUrl;
      res.redirect('/');
    };
};
  
/* GET home page. */
router.get('/app', secured(), function (req, res, next) {
  res.render('pages/app');
});

module.exports = router;
