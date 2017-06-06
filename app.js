"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const RestaurantListModel_1 = require("./src/models/RestaurantListModel");
const ProviderModel_1 = require("./src/models/ProviderModel");
const facebookAuth_1 = require("./facebookAuth");
let passport = require('passport');
class App {
    constructor() {
        this.facebookAuth = new facebookAuth_1.default();
        this.app = express();
        this.config();
        this.routes();
        this.RestaurantList = new RestaurantListModel_1.default();
        this.ProviderList = new ProviderModel_1.default();
        this.api();
    }
    api() {
    }
    config() {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    validateUser(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
    routes() {
        let router;
        router = express.Router();
        router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
        router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/search' }));
        router.get('/auth/userInfo', this.validateUser, (req, res) => {
            console.log('user object:' + JSON.stringify(req.user));
            res.json(req.user);
        });
        router.post('/queued/restaurantList', (req, res) => {
            console.log("test");
            var id = req.body.id;
            var lowWait = req.body.lowWait;
            var highWait = req.body.highWait;
            this.RestaurantList.setEstimateTimes(res, id, lowWait, highWait);
        });
        router.get('/queued/restaurantList', (req, res) => {
            this.RestaurantList.getAllItems(res);
        });
        router.get('/queued/restaurantList/search', (req, res) => {
            var city = req.query.city;
            var state = req.query.state;
            var cuisine = req.query.cuisine;
            var budget = req.query.budget;
            var wait = req.query.wait;
            this.RestaurantList.searchItems(res, city, state, cuisine, budget, wait);
        });
        router.get('/queued/providerList/:userId', (req, res) => {
            var id = req.params.userId;
            this.ProviderList.getList(res, { userId: id });
        });
        router.get('*', (req, res) => {
            res.sendFile(__dirname + '/dist/index.html');
        });
        this.app.use('/', express.static(__dirname + '/dist'));
        this.app.use('/', router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map