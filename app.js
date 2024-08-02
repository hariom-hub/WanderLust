const express = require("express");
const app = express();
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1:27017/WanderLust';
const Listings = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views/listings'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public/css")));


main().then(() => {

    console.log("database connected successfully");
}).catch((error) => {

    console.log(error);
})


async function main() {

    await mongoose.connect(mongoUrl);
}

//home route
app.get('/', (req, res) => {

    res.send("Root path");
})

// all current listings route

app.get('/listings', async (req, res) => {

    let allListings = await Listings.find({});
    res.render("index.ejs", { allListings });
})

//new add new listings route
app.get('/listings/new', async (req, res) => {
    res.render("new.ejs");
})

// all listing route after adding new data
app.post('/listings', async (req, res) => {

    // let newListing = req.body.listings;
    // console.log(newListing);
    let newListing = new Listings(req.body.listings);
    newListing.save();
    // console.log(newListing);
    res.redirect("/listings");
})



//specific listing route
app.get('/listings/:id', async (req, res) => {

    let { id } = req.params;
    const singleList = await Listings.findById(id);
    res.render("show.ejs", { singleList });

});

// get form for editing data (get type)


app.get('/listings/:id/edit', async (req, res) => {

    let { id } = req.params;
    const listing = await Listings.findById(id);
    // console.log(listing);
    res.render("edit.ejs", { listing });

})

//put route for updating data

app.put('/listings/:id', async (req, res) => {

    let { id } = req.params;
    await Listings.findByIdAndUpdate(id, { ...req.body.listings });
    res.redirect(`/listings/${id}`);

})


//delete route

app.delete('/listings/:id',async(req,res)=>{

    let {id} = req.params;
    await Listings.findByIdAndDelete(id);
    res.redirect('/listings');
})

app.listen(5050, () => {

    console.log("server is listening to port : 5050");
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

//show route