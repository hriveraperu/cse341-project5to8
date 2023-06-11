const passportg = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

require('dotenv').config()

passportg.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://cse341-project5to8.onrender.com/auth/google/callback",
    passReqToCallback: true
},
    function(_request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => void) {
        done(null, profile);
    }
));

passportg.serializeUser((user: any,done: (arg0: null, arg1: any) => void) => {
    done(null, user);
});

passportg.deserializeUser((user: any,done: (arg0: null, arg1: any) => void) => {
    done(null, user);
})
