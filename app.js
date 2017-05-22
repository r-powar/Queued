"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const RestaurantListModel_1 = require("./src/models/RestaurantListModel");
class App {
    constructor() {
        this.app = express();
        this.routes();
        this.config();
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
        router.get('/queued/restaurantList', (req, res) => {
            console.log('List of the restaurants');
            this.RestaurantList.getAllItems(res);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        });
        this.app.use('/', router);
        this.app.use('/', express.static(__dirname + '/dist'));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map