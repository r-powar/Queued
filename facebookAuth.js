"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const facebookOauth_1 = require("./facebookOauth");
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
class facebookAuth {
    constructor() {
        this.clientId = facebookOauth_1.default.id;
        this.secretId = facebookOauth_1.default.secret;
        passport.use(new FacebookStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "http://queuedapp.azurewebsites.net/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                console.log('validating facebook profile:' + JSON.stringify(profile));
                this.userId = profile.id;
                this.displayName = profile.displayName;
                this.email = profile.emails[0].value;
                return done(null, profile);
            });
        }));
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    }
}
exports.default = facebookAuth;
//# sourceMappingURL=facebookAuth.js.map