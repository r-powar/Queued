"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rpowar on 6/3/17.
 */
var facebookOauth_1 = require("./facebookOauth");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookAuth = (function () {
    function facebookAuth() {
        var _this = this;
        this.clientId = facebookOauth_1.default.id;
        this.secretId = facebookOauth_1.default.secret;
        passport.use(new FacebookStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "http://queuedapp.azurewebsites.net/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'emails']
        }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log('validating facebook profile:' + JSON.stringify(profile));
                _this.userId = profile.id;
                _this.displayName = profile.displayName;
                _this.email = profile.emails[0].value;
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
    return facebookAuth;
}());
exports.default = facebookAuth;
