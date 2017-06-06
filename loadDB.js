/**
 * Created by rpowar on 5/1/17.
 */
db = db.getSiblingDB('queued')
db.createCollection('restaurantList')
restaurantListCollection = db.getCollection('restaurantList')
restaurantListCollection.remove({})

restaurantListCollection.insert({
    id: 1,
    name:"Cherry Street Market",
    address: "Cherry Street 14",
    city: "Seattle",
    state: "WA",
    phone: "(206) 296-6000",
    budget: "$10-30",
    cuisine: "Mediterranean",
    lowWait: 15,
    highWait: 20,
    imageURL: "",
    owner: "Guy Personman"
})

restaurantListCollection.insert({
    id: 2,
    name:"Paseo Caribbean Food",
    address: "Columbus Street 29",
    city: "Seattle",
    state: "WA",
    phone: "(206) 545-7440",
    budget: "$1-10",
    cuisine: "Cuban",
    lowWait: 6,
    highWait: 10,
    imageURL: "",
    owner: "Raj Powar"
})

restaurantListCollection.insert({
    id: 3,
    name:"Pike Place Chowder",
    address: "1530 Postly Aly",
    city: "Seattle",
    state: "WA",
    phone: "(206) 267-2537",
    budget: "$10-30",
    cuisine: "American",
    lowWait: 10,
    highWait: 15,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 4,
    name:"Chan Seattle",
    address: "86 Pine St",
    city: "Seattle",
    state: "WA",
    phone: "(206) 443-5443",
    budget: "$10-30",
    cuisine: "Korean",
    lowWait: 5,
    highWait: 7,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 5,
    name:"Umma's Lunch Box",
    address: "1301 5th Ave",
    city: "Seattle",
    state: "WA",
    phone: "(206) 854-3166",
    budget: "$1-10",
    cuisine: "Korean",
    lowWait: 13,
    highWait: 20,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 6,
    name:"Buenos Aires Grill",
    address: "2328 1st Ave",
    city: "Seattle",
    state: "WA",
    phone: "(206) 448-3114",
    budget: "$30-60",
    cuisine: "Argentine",
    lowWait: 15,
    highWait: 20,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 7,
    name:"Xi'an Noodles",
    address: "5259 University Way NE",
    city: "Seattle",
    state: "WA",
    phone: "(206) 522-8888",
    budget: "$1-10",
    cuisine: "Chinese",
    lowWait: 5,
    highWait: 7,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 8,
    name:"Fu Shen",
    address: "9019 Aurora Ave N",
    city: "Seattle",
    state: "WA",
    phone: "(206) 624-3888",
    budget: "$10-30",
    cuisine: "Chinese",
    lowWait: 10,
    highWait: 15,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 9,
    name:"Annapurna Cafe",
    address: "1833 Broadway",
    city: "Seattle",
    state: "WA",
    phone: "(206) 320-7770",
    budget: "$10-30",
    cuisine: "Indian",
    lowWait: 15,
    highWait: 20,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 10,
    name:"Bahn Thai",
    address: "409 Roy St",
    city: "Seattle",
    state: "WA",
    phone: "(206) 283-0444",
    budget: "$10-30",
    cuisine: "Thai",
    lowWait: 10,
    highWait: 15,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 11,
    name:"Rhein Haus",
    address: "912 12th Ave",
    city: "Seattle",
    state: "WA",
    phone: "(206) 325-5409",
    budget: "$10-30",
    cuisine: "German",
    lowWait: 5,
    highWait: 10,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 12,
    name:"Pomodoro",
    address: "2366 Eastlake Ave E",
    city: "Seattle",
    state: "WA",
    phone: "(206) 324-3160",
    budget: "$10-30",
    cuisine: "Italian",
    lowWait: 20,
    highWait: 25,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 13,
    name:"Cascina Spinasse",
    address: "1531 14th Ave",
    city: "Seattle",
    state: "WA",
    phone: "(206) 251-7673",
    budget: "$30-60",
    cuisine: "Italian",
    lowWait: 20,
    highWait: 30,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 14,
    name:"L'Oursin",
    address: "1315 E Jefferson St",
    city: "Seattle",
    state: "WA",
    phone: "(206) 485-7173",
    budget: "$30-60",
    cuisine: "French",
    lowWait: 20,
    highWait: 30,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 15,
    name:"Cafe Selam",
    address: "2715 E Cherry St",
    city: "Seattle",
    state: "WA",
    phone: "(206) 328-0404",
    budget: "$10-30",
    cuisine: "Ethiopian",
    lowWait: 10,
    highWait: 15,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 16,
    name:"Canlis",
    address: "2576 Aurora Ave N",
    city: "Seattle",
    state: "WA",
    phone: "(206) 283-3313",
    budget: "$60-100",
    cuisine: "American",
    lowWait: 30,
    highWait: 45,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 17,
    name:"Swiss Hibiscus",
    address: "4950 NE 14th Ave",
    city: "Portland",
    state: "OR",
    phone: "(503) 477-9224",
    budget: "$10-30",
    cuisine: "German",
    lowWait: 10,
    highWait: 15,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 18,
    name:"Willow",
    address: "2005 SE 11th Ave",
    city: "Portland",
    state: "OR",
    phone: "(814) 933-8872",
    budget: "$30-60",
    cuisine: "American",
    lowWait: 14,
    highWait: 18,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 19,
    name:"Little Bird Bistro",
    address: "219 SW 6th Ave",
    city: "Portland",
    state: "OR",
    phone: "(503) 688-5952",
    budget: "$30-60",
    cuisine: "French",
    lowWait: 10,
    highWait: 20,
    imageURL: "",
    owner: ""
})

restaurantListCollection.insert({
    id: 20,
    name:"Tadu Ethiopian Kitchen",
    address: "484 Ellis St",
    city: "San Francisco",
    state: "CA",
    phone: "(415) 409-6649",
    budget: "$10-30",
    cuisine: "Ethiopian",
    lowWait: 15,
    highWait: 20,
    imageURL: "",
    owner: ""
})
