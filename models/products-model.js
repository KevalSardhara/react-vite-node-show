import mongoose from "mongoose";

// Schema making thinges to be te the here
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String }, // String is shorthand for {type: String}
    price: {
        type: Number,
        min: [100, 'Too Less Price'], // seconds is a make the error message
        max: [500, 'Too High Price']
    }, // Number
    date: { type: Date, default: Date.now },
    rating: Boolean,
    meta: {
        votes: Number,
        favs: Number
    },
    images: [{ type: String }]
});
// collection make after convert Product -> Products -> "s"
const Product = mongoose.model('Product', productSchema);

// console.log(Product);

export default Product;