var express = require('express');
var firebase = require('firebase');
var router = express.Router();
const { AdminController } = require("../controllers/admin-controller");

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

router.get('/user-show-all-items', new AdminController().user_show_all_items);

router.post('/admin-dashboard', new AdminController().add_items); 
router.get('/add-items', new AdminController().show_add_items );
router.get('/show-all-items', new AdminController().show_all_items );
router.post('/edit-items', new AdminController().edit_items); 
router.post('/delete-items',new AdminController().delete_items);
router.post('/place_order', new AdminController().place_order );
router.post('/user-profile', function(req, res, next) {
  console.log(req.body.user_info);
});
//router.get('/edit_items/:item_ name&:item_cost&:item_quantity', function(req, res) {
//  console.log('user' + req.params.name);    
// });



// router.get('/add-items', function (req, res) {
  
//   console.log("HTTP Get Request");
//   //res.send("HTTP GET Request");
//   //Insert key,value pair to database
//   firebase.database().ref('/items').set({item_name: 'GET Request'});
  
// });



// router.post('/register-user', function(req, res, next) {
//   var firstName = req.body.fname;
//   var lastName = req.body.lname;
//   var email = req.body.email;
//   var password = req.body.password;;
//   var confirmPassword = req.body.cpassword;

  
  
// });
module.exports = router;
