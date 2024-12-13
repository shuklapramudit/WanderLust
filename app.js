const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))


app.get("/", (req, res) => {
    res.send("Hi I am root");
});
// Index Raute
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


// Show Raute
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    // Save the new listing to the database
    await newListing.save();
    console.log(newListing);
    res.redirect("listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


// Update Route
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);

});
// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
console.log(id);
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

})

app.listen(8080, () => {
    console.log("Server is listining to port 8080");
});
