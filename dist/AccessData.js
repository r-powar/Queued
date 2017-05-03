"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
class AccessData {
    constructor() {
        AccessData.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
AccessData.DB_CONNECTION_STRING = 'mongodb://localhost:27017/queued';
AccessData.connect();
exports.default = AccessData;
//# sourceMappingURL=AccessData.js.map