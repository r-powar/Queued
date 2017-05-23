"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccessData_1 = require("../AccessData");
var mongoose = AccessData_1.default.mongooseInstance;
var mongooseConnection = AccessData_1.default.mongooseConnection;
var RestaurantListModel = (function () {
    function RestaurantListModel() {
        this.createSchema();
        this.createModel();
    }
    RestaurantListModel.prototype.createSchema = function () {
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
        }, { collection: 'restaurantList' });
    };
    RestaurantListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("RestaurantList", this.schema);
    };
    RestaurantListModel.prototype.getAllItems = function (response) {
        var query = this.model.find({});
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    RestaurantListModel.prototype.setEstimateTimes = function (response, id, lowWait, highWait) {
        var query = this.model.findOne({ id: id });
        query.exec(function (err, data) {
            data.lowWait = lowWait;
            data.highWait = highWait;
            data.save();
            response.json(data);
        });
    };
    return RestaurantListModel;
}());
exports.default = RestaurantListModel;
