"use strict";
var AccessData_1 = require('../AccessData');
var mongoose = AccessData_1.default.mongooseInstance;
var mongooseConnection = AccessData_1.default.mongooseConnection;
var RestaurantListModel = (function () {
    function RestaurantListModel() {
        this.createSchema();
        this.createModel();
    }
    RestaurantListModel.prototype.createSchema = function () {
        this.schema = mongoose.Schema({
            name: String,
            address: String,
            waitTime: String,
            id: Number
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
    return RestaurantListModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RestaurantListModel;
