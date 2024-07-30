const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing");

const mongoUrl = 'mongodb://127.0.0.1:27017/WanderLust';

main().then(() => {

    console.log("db connection working properly");
}).catch((error) => {

    console.log(error);
})

async function main() {

    await mongoose.connect(mongoUrl);
}

const initDb = async () => {

    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");

}

initDb();