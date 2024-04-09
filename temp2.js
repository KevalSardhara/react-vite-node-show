import express from "express";
import bodyParser from "body-parser";

const app = express();

// In built in express so don't used for the right now in the express module
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// #3 Built-In type of middleware are her in express
// bodyParser
app.use(express.json()) // read json data through on -> "req.body" 
// app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
// index.html = "/" default
// index = "/" default in serevr

app.set("view engine", "ejs");


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
function successTrue(req, res) {
    return res.json({
        success: true,
        messages: res.messages,
    });
}
function successFalse(req, res) {
    return res.json({
        success: false,
        messages: res.messages,
    });
}

app.post("/", auth1, (req, res) => {
    res.messages = "success";
    successTrue(req, res);
});

// app.use(auth2);
app.post("/user/", auth2, (req, res) => {
    res.messages = "success";
    successTrue(req, res);
});
// app.use((err, req, res, next) => {
//     // res.messages = "404 page not found";
//     return res.json({
//         success: false,
//         messages: err.messages,
//     });
// });

app.get("*", (req, res) => {
    res.messages = "404 page not found";
    return res.json({
        success: true,
        messages: res.messages,
    });
});



app.listen(5000, () => {
    console.log("Example app listening on port 3000!");
});
