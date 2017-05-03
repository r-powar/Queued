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
            name: String,
            address: String,
            waitTime: String,
            id: Number
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
}
exports.default = RestaurantListModel;
//# sourceMappingURL=RestaurantListModel.js.map