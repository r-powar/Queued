1. You need a mongodb instance running on your machine, which should be running on port 27017 by default
2. Data for your db will be placed under "data/db", make sure this path is specified
3. To load the script into db, you to access your mongo shell
> mongo
> show dbs -> to get the list of databases
> use queued
> load('loadDB.js') -> make sure to specify the relative path
> db.restaurantList.find().pretty() -> to check the values in your db

3. "npm run grunt" is used to compile typescript files, we will be making use of webpack going forward
4. "npm start" to start the express server


