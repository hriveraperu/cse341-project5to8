const expressUser = require('express');
var routerUser = expressUser.Router();
const session = require('express-session')

// const passport = require('../controllers/google-oauth');
const passport = require('passport');

function isLoggedIn(req: { user: any; },res: { sendStatus: (arg0: number) => any; },next: () => any) {
    req.user ? next() : res.sendStatus(401);
}

routerUser.get('/google', 
    passport.authenticate('google', { scope:
        [ 'email', 'profile'] }
        ));

routerUser.get('/google/callback', 
    passport.authenticate('google', { 
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure',
        scope: [ 'email', 'profile'] 
}));


routerUser.get('/protected', isLoggedIn, (req: { user: { displayName: any; }; },res: { send: (arg0: string) => void; }) => {
    let name = req.user.displayName;
    res.send(`Hello there ${name}!`);
});

routerUser.get('/google/failure', (req: any,res: { send: (arg0: string) => void; }) => {
    res.send('Something went wrong!');
});

routerUser.use('/logout', (req: { session: { destroy: () => void; }; }, res: { send: (arg0: string) => void; }) => {
    req.session.destroy();
    res.send('Logged out successfully, see you soon!');
})



module.exports = routerUser;
