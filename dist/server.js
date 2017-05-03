"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const RestaurantListModel_1 = require("./models/RestaurantListModel");
class Server {
    static bootstrap() {
        return new Server();
    }
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
        this.app.use(express.static(path.join(__dirname, "public")));
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
        router.post('/queued/restaurantList', (req, res) => {
            var jsonObj = req.body;
            console.log(jsonObj);
        });
        router.get('/queued/restaurantList', (req, res) => {
            console.log('List of the restaurants');
            this.RestaurantList.getAllItems(res);
        });
        this.app.use('/', router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map