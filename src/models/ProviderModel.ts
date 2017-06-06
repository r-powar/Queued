/**
 * Created by rpowar on 6/6/17.
 */
import Mongoose = require("mongoose");
import AccessData from '../AccessData';
import IProviderModel from '../interfaces/IProviderModel';

var mongoose = AccessData.mongooseInstance;
var mongooseConnection = AccessData.mongooseConnection;

export default class ProviderListModel {
    public schema: Mongoose.Schema;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema():void{
        this.schema = mongoose.Schema({
            id: Number,
            guestName: String,
            waitList: String,
            groupSize: String,
            userId: String
        }, {collection: 'providerList'}
        );
    }

    public createModel():void{
        this.model = mongooseConnection.model<IProviderModel>("ProviderList", this.schema);
    }

    public getList(response:any, filter:Object){
        var query = this.model.find(filter);
        query.exec((err, list) => {
            response.json(list);
        });
    }
}