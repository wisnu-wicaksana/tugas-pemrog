const express = require('express');
const passport = require('passport');
const { googleLogin } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleLogin
);

module.exports = router;
