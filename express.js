import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import ejs from "ejs";
import jwt from "jsonwebtoken";
import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import { putProduct } from "./controllers/product-controller.js";
import { authorization } from "./authorization/userAuth.js";
// import "./event-modules.js";


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
    // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');


    // #1
    // await mongoose.connect(process.env.MONGO_URL);

    // #2
    await mongoose.connect('mongodb+srv://kevalsardhara7:Kevalmongodb123@ecommerce.qyhmpyn.mongodb.net/');

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

// ------------------------------------------------------------------------------------------------
// Socket Settings and Integrations here
const server = http.createServer(app);
const io = new Server(server);
// ------------------------------------------------------------------------------------------------
app.set("view engine", "ejs");


const a = typeof "data";
console.log(a);

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

function connectSocket() {
    io.on("connection", async (socket) => { // req come through on "connection" name
        console.log("socket -----------> ", socket.id);
        
        // passport for the make the authontication
        // multer for the file upload and socket io integration here
        
        await socket.on("socketAuth", (data) => {
            if (socket.id == data.id) {
                console.log("connection with authentication", data);
                socket.emit("msg", {reqName : "msg2", id: "data.id"});
                socket.on("msg2", (data) => {
                    console.log("data", data);
                });
            }
    
            // setTimeout(() => {
            // console.log(data);
            // }, 100);
    
        });
    });
}
connectSocket();

app.use(express.static(path.join(path.resolve(), process.env.PUBLIC_DIR))); // ./dist/index.html = "/"

// work as comman api api/v1/* (and so on here)
app.use('/api/v1/', authorization, productRouter);
app.use('/api/v1/', userRouter);


app.use('*', (req, res) => {
    // res.sendFile(path.join(path.resolve(), './dist/index.html'));
    // set absolute path here and make perfact
    // return res.sendFile(path.resolve(__dirname, "dist", "index.html"));

    // write here "sendFile" in index.html file data
    // return res.end("data");
    // return res.sendFile(path.join(path.resolve(), './dist/index.html')); // Developer make here 404 Error page
    console.log('complete');
    return res.sendFile(path.join(path.resolve(), './pages/index.html')); // Developer make here 404 Error page
});

// localhost server run here
server.listen(process.env.PORT, () => {
    console.log("Example app listening on port 3000!");
});



// let fsFile = fs.readFileSync('./data.json', 'utf-8');

// MVC controller structure M V C
// model-view-controller

// model - database model
// view - data show file show
// controller - data connectivity between model and view


// -------------------------------------------------------------------------------
// import "./event-modules.js";
// #IMP most import modules here
// Event handlers in nodejs
// click event and more real time working the javascript event handlers
// Event Modules "socet.io" and more real time working handlers
// 
