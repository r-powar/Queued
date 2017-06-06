"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var session = require("express-session");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var RestaurantListModel_1 = require("./src/models/RestaurantListModel");
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
        //add static paths
        // this.app.use('/', express.static(__dirname+'/dist/public'));
        //use logger middlware
        this.app.use(logger("dev"));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        //use cookie parker middleware middlware
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        //use override middlware
        this.app.use(methodOverride());
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    App.prototype.validateUser = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect('/');
        }
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
            res.json(req.user);
        });
        router.post('/queued/restaurantList', function (req, res) {
            console.log("test");
            var id = req.body.id;
            var lowWait = req.body.lowWait;
            var highWait = req.body.highWait;
            _this.RestaurantList.setEstimateTimes(res, id, lowWait, highWait);
        });
        router.get('/queued/restaurantList', function (req, res) {
            _this.RestaurantList.getAllItems(res);
        });
        router.post('/queued/restaurantList/search', function (req, res) {
            var city = req.body.searchCity;
            var state = req.body.searchState;
            var cuisine = req.body.searchCuisine;
            var budget = req.body.searchBudget;
            var wait = req.body.searchWait;
            _this.RestaurantList.searchItems(res, city, state, cuisine, budget, wait);
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
