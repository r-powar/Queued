/**
 * Created by rpowar on 4/30/17.
 */
import Mongoose = require("mongoose");
import AccessData from '../AccessData';
import IRestaurantListModel from '../interfaces/IRestaurantListModel';

var mongoose = AccessData.mongooseInstance;
var mongooseConnection = AccessData.mongooseConnection;

export default class RestaurantListModel{
    public schema:Mongoose.Schema;
    public model:any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void{
        this.schema = mongoose.Schema({
            id: Number,
            name: String,
            address: String,
            city: String,
            state: String,
            budget: String,
            cuisine: String,
            lowWait: Number,
            highWait: Number,
            imageURL: String
        },{collection: 'restaurantList'}
        );
    }

    public createModel(): void{
        this.model = mongooseConnection.model<IRestaurantListModel>("RestaurantList", this.schema);
    }

    public getAllItems(response:any): any{
        var query = this.model.find({});
        query.exec((err, itemArray) =>{
            response.json(itemArray);
            }
        );

    }

}

