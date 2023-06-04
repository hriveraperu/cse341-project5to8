const express = require('express');
var router = express.Router();

const passport = require('../controllers/google-oauth');

router.get('/', 
    passport.authenticate('google', { scope:
        [ 'email', 'profile'] }
        ));

router.get('/callback', 
    passport.authenticate('google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
        [ 'email', 'profile'] 
}));

module.exports = router;
