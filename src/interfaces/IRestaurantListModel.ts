/**
 * Created by rpowar on 4/30/17.
 */
import Mongoose = require("mongoose");

interface IRestaurantListModel extends Mongoose.Document{
        id: Number;
        name: String;
        address: String;
        city: String;
        state: String;
        phone: String;
        budget: String;
        cuisine: String;
        lowWait: Number;
        highWait: Number;
        imageURL: String;
        owner: String;
}

export default IRestaurantListModel;

