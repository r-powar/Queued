/**
 * Created by rpowar on 5/1/17.
 */
db = db.getSiblingDB('queued')
db.createCollection('restaurantList')
restaurantListCollection = db.getCollection('restaurantList')
restaurantListCollection.remove({})
restaurantListCollection.insert({
    name:"Cherry Street Market",
    address: "Cherry Street 14",
    waitTime: "15-20",
    id: 1
})
restaurantListCollection.insert({
    name:"Paseo Caribbean Food",
    address: "Columbus Street 29",
    waitTime: "6-10",
    id: 2
})
restaurantListCollection.insert({
    name:"Pike Place Chowder",
    address: "1530 Postly Aly",
    waitTime: "10-15",
    id:3
})

restaurantListCollection.insert({
    name:"Chan Seattle",
    address: "86 Pine St",
    waitTime: "5-7",
    id:4
})

restaurantListCollection.insert({
    name:"Umma's Lunch Box",
    address: "1301 5th Ave",
    waitTime: "13-20",
    id:5
})