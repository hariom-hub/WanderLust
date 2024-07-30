const express = require("express");

const app = express();
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1:27017/WanderLust';
const Listings = require("./models/listing");
const path = require("path");
app.set("views engine","ejs");
app.set("views",path.join(__dirname,'/views/listings'));



main().then(() => {

    console.log("database connected successfully");
}).catch((error) => {

    console.log(error);
})


async function main() {

    await mongoose.connect(mongoUrl);
}

app.get('/', (req, res) => {

    res.send("Root path");
})


app.get('/listings',async (req,res)=>{

    let allListings = await Listings.find({});
    res.render("index.ejs",{allListings});
})

// app.get('/testListing', async (req, res) => {

//     let sampleListing = new Listings(
//         {
//             title: "Hatta",
//             description: "This is my home town Hatta, district Damoh, Madhya Pradesh",
//             image : "https://en.wikipedia.org/wiki/Silicon_Valley",
//             price: 2000,
//             location: "District Damoh, Madhya Pradesh",
//             country: "INDIA"
//         }
//     );

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull  Testing");

// });

app.listen(5050, () => {

    console.log("server is listening to port : 5050");
})