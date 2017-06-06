"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var session = require("express-session");
var RestaurantListModel_1 = require("./src/models/RestaurantListModel");
var ProviderModel_1 = require("./src/models/ProviderModel");
var facebookAuth_1 = require("./facebookAuth");
var passport = require('passport');
/**
 * The server.
 *
 * @class Server
 */
var App = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function App() {
        this.facebookAuth = new facebookAuth_1.default();
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        this.RestaurantList = new RestaurantListModel_1.default();
        this.ProviderList = new ProviderModel_1.default();
        //add api
        this.api();
    }
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    App.prototype.api = function () {
        //empty for now
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    App.prototype.config = function () {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    };
    App.prototype.validateUser = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    App.prototype.routes = function () {
        var _this = this;
        var router;
        router = express.Router();
        router.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
        router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/search' }));
        router.get('/auth/userInfo', this.validateUser, function (req, res) {
            console.log('user object:' + JSON.stringify(req.user));
            res.json(req.user);
        });
        router.post('/queued/restaurantList', function (req, res) {
            console.log("test");
            var user = req.body.user;
            var lowWait = req.body.lowWait;
            var highWait = req.body.highWait;
            _this.RestaurantList.setEstimateTimes(res, user, lowWait, highWait);
        });
        router.get('/queued/restaurantList', function (req, res) {
            _this.RestaurantList.getAllItems(res);
        });
        router.get('/queued/restaurantList/search', function (req, res) {
            var city = req.query.city;
            var state = req.query.state;
            var cuisine = req.query.cuisine;
            var budget = req.query.budget;
            var wait = req.query.wait;
            _this.RestaurantList.searchItems(res, city, state, cuisine, budget, wait);
        });
        router.get('/queued/providerList/:userId', function (req, res) {
            var id = req.params.userId;
            _this.ProviderList.getList(res, { userId: id });
        });
        router.get('*', function (req, res) {
            res.sendFile(__dirname + '/dist/index.html');
        });
        //use router middleware
        this.app.use('/', express.static(__dirname + '/dist'));
        this.app.use('/', router);
    };
    return App;
}());
exports.default = new App().app;
