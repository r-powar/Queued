"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var errorHandler = require("errorhandler");
var methodOverride = require("method-override");
var RestaurantListModel_1 = require("./src/models/RestaurantListModel");
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
        //create expressjs application
        this.app = express();
        //add routes
        this.routes();
        //configure application
        this.config();
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
        //IndexRoute
        /*
        router.post('/queued/restaurantList', (req, res) =>{
            let jsonObj = req.body;
            console.log(jsonObj);
        });*/
        router.get('/queued/restaurantList', function (req, res) {
            console.log('List of the restaurants');
            _this.RestaurantList.getAllItems(res);
        });
        //use router middleware
        this.app.use('/', router);
        this.app.use('/', express.static(__dirname + '/dist'));
        //this.app.use('/dist', express.static(path.join(__dirname, 'dist')));
    };
    return App;
}());
exports.default = new App().app;
