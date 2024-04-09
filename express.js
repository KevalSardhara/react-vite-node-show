import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/product-routes.js";
import { putProduct } from "./controllers/product-controller.js";
import dotenv from "dotenv";
import path from "path";

// set the environment variable as a local level variable for the development time to make here
// ste the path and congif for the cradentials in ".env" file
dotenv.config({
    path: './.env',
});


// ------------------------------------------------------------------------------------------------

main().then(() => {
    console.log("database connection established");
}).catch(err => console.log(err));

async function main() {
    // "mongodb://127.0.0.1:27017/ecommerce" -> last name in URL is database name-> "ecommerce"
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');


    // #1
    // await mongoose.connect(process.env.MONGO_URL);
    
    // #2
    // await mongoose.connect('mongodb+srv://kevalsardhara7:Kevalmongodb123@ecommerce.qyhmpyn.mongodb.net/');
    
    // #3
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// async function main() {
//     // "mongodb://127.0.0.1:27017/ecommerce" -> last name in URL is database name-> "ecommerce"
//     await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }




// ------------------------------------------------------------------------------------------------
const app = express();

app.set("view engine", "ejs");

// #CORS enable why use cors here
// react run on different server PORT No. -> 3000
// localhost run on different server PORT No. -> 5000
// mongodb server run on different server PORT No. -> 27017
// So use cors here
app.use(cors());

// req.body json reader 
app.use(express.json())

// cookes and more access and add
app.use(morgan("dev"));

// static page show as a "public" is and folder show as static page to show your first page
// app.use(express.static(process.env.PUBLIC_DIR)); // ./dist/index.html = "/"
app.use(express.static(path.join(path.resolve(), process.env.PUBLIC_DIR))); // ./dist/index.html = "/"

// work as comman api api/v1/* (and so on here)
app.use('/api/v1/', router);
app.use('*', (req, res) => {
    // res.sendFile(path.join(path.resolve(), './dist/index.html'));
    // set absolute path here and make perfact
    // return res.sendFile(path.resolve(__dirname, "dist", "index.html"));

    // write here "sendFile" in index.html file data
    // return res.end("data");
    return res.sendFile(path.join(path.resolve(), './dist/index.html')); // Developer make here 404 Error page
});

// localhost server run here
app.listen(process.env.PORT, () => {
    console.log("Example app listening on port 3000!");
});



// let fsFile = fs.readFileSync('./data.json', 'utf-8');

// MVC controller structure M V C
// model-view-controller

// model - database model
// view - data show file show
// controller - data connectivity between model and view
