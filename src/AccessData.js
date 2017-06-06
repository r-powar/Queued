"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by rpowar on 4/30/17.
 */
var Mongoose = require("mongoose");
var AccessData = (function () {
    function AccessData() {
        AccessData.connect();
    }
    AccessData.connect = function () {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", function () {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    };
    return AccessData;
}());
AccessData.DB_CONNECTION_STRING = 'mongodb://dbadmin:queued@ds064799.mlab.com:64799/queued';
AccessData.connect();
exports.default = AccessData;
