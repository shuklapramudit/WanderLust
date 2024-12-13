const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description:{
type: String,
},
    image: {
        type: String,
         default:"https://a0.muscache.com/im/pictures/miso/Hosting-44090710/original/6eb2052f-0b82-49eb-96ee-022e7a6526ce.jpeg?im_w=1200&im_format=avif",

        set: (v) => v === "" ? "https://a0.muscache.com/im/pictures/miso/Hosting-44090710/original/6eb2052f-0b82-49eb-96ee-022e7a6526ce.jpeg?im_w=1200&im_format=avif" : v,
    },
    price: Number,
    location: String,
    country: String,
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;