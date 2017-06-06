/**
 * Created by rpowar on 6/6/17.
 */
import Mongoose = require("mongoose");

interface IProviderModel extends Mongoose.Document{
    id: Number;
    guestName: String;
    waitList: String;
    groupSize: String;
    userId: String;
}

export default IProviderModel;