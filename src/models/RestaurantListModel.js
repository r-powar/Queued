"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessData_1 = require("../AccessData");
var mongoose = AccessData_1.default.mongooseInstance;
var mongooseConnection = AccessData_1.default.mongooseConnection;
class RestaurantListModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
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
    }
    createModel() {
        this.model = mongooseConnection.model("RestaurantList", this.schema);
    }
    getAllItems(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    setEstimateTimes(response, id, lowWait, highWait) {
        var query = this.model.findOne({ id: id });
        query.exec((err, data) => {
            data.lowWait = lowWait;
            data.highWait = highWait;
            data.save();
            response.json(data);
        });
    }
}
exports.default = RestaurantListModel;
//# sourceMappingURL=RestaurantListModel.js.map