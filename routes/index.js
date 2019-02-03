var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password');
});
// router.post('/register-user', function(req, res, next) {
//   var firstName = req.body.fname;
//   var lastName = req.body.lname;
//   var email = req.body.email;
//   var password = req.body.password;;
//   var confirmPassword = req.body.cpassword;

  
  
// });
module.exports = router;
