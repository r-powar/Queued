"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessData_1 = require("../AccessData");
var mongoose = AccessData_1.default.mongooseInstance;
var mongooseConnection = AccessData_1.default.mongooseConnection;
class ProviderListModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = mongoose.Schema({
            id: Number,
            guestName: String,
            waitList: String,
            groupSize: String,
            userId: String
        }, { collection: 'providerList' });
    }
    createModel() {
        this.model = mongooseConnection.model("ProviderList", this.schema);
    }
    getList(response, filter) {
        var query = this.model.find(filter);
        query.exec((err, list) => {
            response.json(list);
        });
    }
}
exports.default = ProviderListModel;
//# sourceMappingURL=ProviderModel.js.map