"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccessData_1 = require("../AccessData");
var mongoose = AccessData_1.default.mongooseInstance;
var mongooseConnection = AccessData_1.default.mongooseConnection;
var ProviderListModel = (function () {
    function ProviderListModel() {
        this.createSchema();
        this.createModel();
    }
    ProviderListModel.prototype.createSchema = function () {
        this.schema = mongoose.Schema({
            id: Number,
            guestName: String,
            waitList: String,
            groupSize: String,
            userId: String
        }, { collection: 'providerList' });
    };
    ProviderListModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("ProviderList", this.schema);
    };
    ProviderListModel.prototype.getList = function (response, filter) {
        var query = this.model.find(filter);
        query.exec(function (err, list) {
            response.json(list);
        });
    };
    return ProviderListModel;
}());
exports.default = ProviderListModel;
