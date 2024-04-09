import express from "express";
import fs from "fs";

import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

// fs.readFile('./data.json', 'utf-8', (err, json) => {
//     console.log(json);
//     return;
// });



// In built in express so don't used for the right now in the express module
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// #3 Built-In type of middleware are her in express
// bodyParser
app.use(express.json()) // read json data through on -> "req.body" 
// app.use(express.urlencoded({ extended: false }));

// index.html = "/" default
// index = "/" default in serevr

app.set("view engine", "ejs");




// #4 Third Party Middleware make to be the here
// We are download this middle waer
// app.use(morgan());
// app.use(morgan("combined"));
// app.use(morgan("default"));
app.use(morgan("dev"));  // We are download this middle waer

app.use(express.static("public"));
// server log is most import here
// industry best practices are work here
// const logger = (req, res, next) => {
//     console.log("logger", req.url, req.method, req.hostname, new Date());
//     next();
// };

// app.get("/", (req, res) => {
//     console.log("Hello World! /// terminal");
//     res.end("Hello World! ///");
// });

// app.use(logger); // srever side logger for the devops server, and developer to run the database

let fsFile = fs.readFileSync('./data.json', 'utf-8');
// console.log(faFile);

function successTrue(req, res) {
    // return res.json(JSON.parse(res.products));  
    return res.json(
        {
            success: true,
            products: res.products,
        });
}
app.get("/products", (req, res) => {
    res.products = fsFile;
    res.json(fsFile);
});
app.put("/products/:id", (req, res) => {
    fsFile = JSON.parse(fsFile);
    const putDate = req.body;
    // const temp = fsFile.find(p => p.id === (+req.params.id));

    // console.log(putDate);
    // console.log(fsFile);
    // fsFile[(+req.params.id) - 1].title = putDate.title;
    // fsFile[(+req.params.id) - 1].description = putDate.description;
    // fsFile[(+req.params.id) - 1].price = putDate.price;
    // fsFile[(+req.params.id) - 1].discountPercentage = putDate.discountPercentage;
    // fsFile[(+req.params.id) - 1].rating = putDate.rating;

    fsFile.splice(+req.params.id,1,{...fsFile[+req.params.id] , ...req.body});

    // best way to write responce Object
    res.status(201).json({
        successTrue: true,
    });
});

// app.get("/products", (req, res) => {
//     res.products = JSON.parse(fsFile);
//     console.log(fsFile);
//     successTrue(req, res);
// });


// app.post("/products/add", (req, res) => {
//     const add = req.body;
//     fsFile = JSON.parse(fsFile);
//     fsFile.products.push(add);
//     // JSON.stringify(fsFile);
//     console.log(fsFile);
//     // console.log(add);
//     // JSON.stringify(JSON.parse(fsFile)["products"].push(add));
//     // console.log(fsFile, "---");
//     // JSON.parse(fsFile);
//     // fsFile.push(JSON.parse(add));

//     res.products = "Add Successfully";
//     successTrue(req, res);
// });



// app.get("/products/:id", (req, res) => {
//     // res.products = JSON.parse(fsFile)["products"][+req.params.id - 1];
//     // fsFile.find(p => p.id === req.params.id);
//     res.products = JSON.parse(fsFile)["products"].find(p => p.id === +req.params.id);
//     successTrue(req, res);
// });
// app.put("/products/:id", (req, res) => {

//     res.json();
// });


// app.get("*", (req, res) => {
//     res.messages = "404 page not found";
//     return res.json({
//         success: true,
//         messages: res.messages,
//     });
// });



app.listen(5000, () => {
    console.log("Example app listening on port 3000!");
});
// -------------------------------------------------------------------------------------------------

const auth1 = (req, res, next) => {
    console.log("logger", req.url, req.method, req.hostname, new Date(), req.body);
    if ((+req.body.p) === 123) {
        next();
    } else {
        res.messages = `password wrong ${+req.body.p}`;
        successFalse(req, res);
    }
};

const auth2 = (req, res, next) => {
    console.log("logger", req.url, req.method, req.hostname, new Date(), req.body);
    if ((+req.body.p) === 456) {
        next();
    } else {
        res.messages = `password wrong ${+req.body.p}`;
        successFalse(req, res);
    }
};

// Method for the USE in express
// app.use(); After run the synchronized way to make the request in -> (app.use(auth))
// app.use(auth1);
// function successTrue(req, res) {
//     return res.json({
//         success: true,
//         messages: res.messages,
//     });
// }
// function successFalse(req, res) {
//     return res.json({
//         success: false,
//         messages: res.messages,
//     });
// }

// app.post("/", auth1, (req, res) => {
//     res.messages = "success";
//     successTrue(req, res);
// });

// // app.use(auth2);
// app.post("/user/", auth2, (req, res) => {
//     res.messages = "success";
//     successTrue(req, res);
// });





// app.use((err, req, res, next) => {
//     // res.messages = "404 page not found";
//     return res.json({
//         success: false,
//         messages: err.messages,
//     });
// });

// app.get("*", (req, res) => {
//     res.messages = "404 page not found";
//     return res.json({
//         success: true,
//         messages: res.messages,
//     });
// });



// app.listen(5000, () => {
//     console.log("Example app listening on port 3000!");
// });
