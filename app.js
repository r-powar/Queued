"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const RestaurantListModel_1 = require("./src/models/RestaurantListModel");
let passport = require('passport');
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.RestaurantList = new RestaurantListModel_1.default();
        this.api();
    }
    api() {
    }
    config() {
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    routes() {
        let router;
        router = express.Router();
        router.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
        router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/search' }));
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
        router.get('*', (req, res) => {
            res.sendFile(__dirname + '/dist/index.html');
        });
        this.app.use('/', express.static(__dirname + '/dist'));
        this.app.use('/', router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map