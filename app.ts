import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as session from 'express-session';
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose");
import RestaurantListModel from './src/models/RestaurantListModel';
import FacebookAuth from "./facebookAuth";

let passport = require('passport');


/**
 * The server.
 *
 * @class Server
 */
class App {

    public app: express.Application;
    public RestaurantList: RestaurantListModel;
    public facebookAuth: FacebookAuth;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.facebookAuth = new FacebookAuth();

        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        this.RestaurantList = new RestaurantListModel();

        //add api
        this.api();

    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    private config() : void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({ secret: 'keyboard cat' }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private validateUser(req, res, next):void{
        if (req.isAuthenticated()) { return next(); }
            res.redirect('/');
    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
        let router: express.Router;
        router = express.Router();

/*        router.use( (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });*/

        router.get('/auth/facebook',
            passport.authenticate('facebook',
                {scope: ['public_profile', 'email'] }
            )
        );

        router.get('/auth/facebook/callback',
            passport.authenticate('facebook',
                { failureRedirect: '/', successRedirect: '/search' }
            )
        );

        router.get('/auth/userInfo', this.validateUser,  (req: any, res: any) => {
            console.log('user object:' + JSON.stringify(req.user));
            res.status(200).json(req.user);
        });

        router.post('/queued/restaurantList', (req, res) => {
            console.log("test");
            var id = req.body.id;
            var lowWait = req.body.lowWait;
            var highWait = req.body.highWait;
            this.RestaurantList.setEstimateTimes(res, id, lowWait, highWait);
        });

        router.get('/queued/restaurantList',(req, res) => {
            this.RestaurantList.getAllItems(res);
        });

        router.get('/queued/restaurantList/search',(req, res) => {
            var city = req.query.city;
            var state = req.query.state;
            var cuisine = req.query.cuisine;
            var budget = req.query.budget;
            var wait = req.query.wait;
            this.RestaurantList.searchItems(res, city, state, cuisine, budget, wait);
        });

        router.get('*', (req, res) =>{
            res.sendFile(__dirname + '/dist/index.html');
        });

        //use router middleware
        this.app.use('/', express.static(__dirname + '/dist'));
        this.app.use('/',router);
    }
}

export default new App().app;