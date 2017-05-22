import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose");
import RestaurantListModel from './src/models/RestaurantListModel';



/**
 * The server.
 *
 * @class Server
 */
class App {

    public app: express.Application;
    public RestaurantList: RestaurantListModel;

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //add routes
        this.routes();

        //configure application
        this.config();

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
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
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

        //IndexRoute
        /*
        router.post('/queued/restaurantList', (req, res) =>{
            let jsonObj = req.body;
            console.log(jsonObj);
        });*/

        router.get('/queued/restaurantList',(req, res) => {
            console.log('List of the restaurants');
            this.RestaurantList.getAllItems(res);
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        });


        //use router middleware
        this.app.use('/',router);
        this.app.use('/', express.static(__dirname + '/dist'));
        //this.app.use('/dist', express.static(path.join(__dirname, 'dist')));
    }
}

export default new App().app;