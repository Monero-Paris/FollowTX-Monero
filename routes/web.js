const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

const User = require('../models/User')

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('test')
		User.findOne({ usernameField: 'name' }, function(err, user) {
			console.log(2)
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));

const IndexController = require('../controllers/IndexController')

router.get('/', IndexController.index)


router.get('/login', (request, response) => {
	response.render('login.html')
})

router.post('/login',
	passport.authenticate('local', { successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true })
);

router.get('/dashboard', (request, response) => {
	response.render('dashboard.html')
})

module.exports = router