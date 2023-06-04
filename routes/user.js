const express = require('express');
var router = express.Router();

// const passport = require('../controllers/google-oauth');
const passport = require('passport');

function isLoggedIn (req, res, next) {
    req.user ? next () : res.sendStatus (401);
}

router.get('/google', 
    passport.authenticate('google', { scope:
        [ 'email', 'profile'] }
        ));

router.get('/google/callback', 
    passport.authenticate('google', { 
        successRedirect: '../../protected',
        failureRedirect: '../failure'
        [ 'email', 'profile'] 
}));

router.get('/protected', isLoggedIn, (req,res) => {
    let name = req.user.displayName();
    res.send(`Hello there ${name}!`);
});

router.get('/google/failure', (req,res) => {
    res.send('Something went wrong!');
});


module.exports = router;
