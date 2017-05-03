/**
 * Created by rpowar on 4/30/17.
 */
import Mongoose = require("mongoose");

interface IRestaurantListModel extends Mongoose.Document{
        name: string;
        address: string;
        waitTime: string;
        id:number;
}

export default IRestaurantListModel;

