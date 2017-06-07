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
            imageURL: String,
            owner: String
        },{collection: 'restaurantList'}
        );
    }

    public createModel(): void{
        this.model = mongooseConnection.model<IRestaurantListModel>("RestaurantList", this.schema);
    }

    public getAllItems(response:any): any{
        var query = this.model.find({}).sort({"id": 1});
        query.exec((err, itemArray) =>{
            response.json(itemArray);
            }
        );
    }

    public searchItems(response:any, searchCity: String, searchState: String, searchCuisine: String, searchBudget: String, searchWait: String): any{
        var query = this.model.find({});
        if (searchCity != null)
        {
            query.where('city', searchCity);
        }
        if (searchState != null)
        {
            query.where('state', searchState);
        }
        if (searchCuisine != null)
        {
            query.where('cuisine', searchCuisine);
        }
        if (searchBudget != null)
        {
            query.where('budget', searchBudget);
        }
        if (searchWait != null)
        {
            query.where('highWait').lte(searchWait);
        }
        query.exec((err, itemArray) =>{
            response.json(itemArray);
            }
        );
    }

    public setEstimateTimes(response: any, user: String, lowWait: Number, highWait: Number): any{
        var query = this.model.findOne({owner: user});
        query.exec((err, data) => {
            data.lowWait = lowWait;
            data.highWait = highWait;
            data.save();
            response.json(data);
        });
    }

}

