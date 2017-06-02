/**
 * Created by rpowar on 4/30/17.
 */
import Mongoose = require("mongoose");

class AccessData {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    static DB_CONNECTION_STRING:string = 'mongodb://dbadmin:queued@ds064799.mlab.com:64799/queued';

    constructor () {
        AccessData.connect();
    }

    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });

        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }

}
AccessData.connect();
export default AccessData;