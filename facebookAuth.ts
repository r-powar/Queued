/**
 * Created by rpowar on 6/3/17.
 */
import facebookAppAuth from './facebookOauth';

let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;

class facebookAuth{

    userId: string;
    displayName: string;
    email: string;
    clientId: string;
    secretId: string;

    constructor() {
        this.clientId = facebookAppAuth.id;
        this.secretId = facebookAppAuth.secret;

        passport.use(new FacebookStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "http://queuedapp.azurewebsites.net/auth/facebook/callback",
                profileFields: ['id', 'displayName', 'emails']
            },
            (accessToken, refreshToken, profile, done) => {
                process.nextTick( () => {
                    console.log('validating facebook profile:' + JSON.stringify(profile));
                    this.userId = profile.id;
                    this.displayName = profile.displayName;
                    this.email = profile.emails[0].value;
                    return done(null, profile);
                });
            }
        ));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    }
}

export default facebookAuth;