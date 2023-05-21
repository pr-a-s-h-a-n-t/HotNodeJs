const express = require("express");

// set up a server
const app = express();

// set up a port
const port = 8080;

//ejs
app.set("view engine", "ejs");

// use html instead of ejs file from public folder
app.use(express.static("public"));

// access the from req.body
// Note: by default express does not parse the body of the request. so we have to use middleware function to parse the body of the request.
app.use(express.urlencoded({ extended: true })); // this middleware function is used to parse the body of the request. extended: true is used to parse the nested objects.

// for json data
app.use(express.json()); // this middleware function is used to parse the json data from a body.

//use logger middleware function. all the routes defined below will be able to use logger middleware function. if you want to use it for a particular route then you have to define it before that route.
app.use(logger); // defined on line no. 38

// set up a route

// app.get("/", (req, res, next) => {}
// we never use next() in 99% of the cases. it is used to call the next middleware function. we will learn about it later.

app.get("/", (req, res) => {
  //   res.send("Hello World");

  //render ejs file
  // res.render("index", { text: "Developer" }); // variable defined inside server.

  //render html file
  res.render("index.html");
});

// set up a route
const userRouter = require("./routes/users"); // importing userRouter from users.js file.

app.use("/users", userRouter); // all the routes inside userRouter will be prefixed with /users.

// set up a listener

//logger middleware function

//Q. what is logger middleware function?
//A. logger middleware function is a function
// which is used to log the request url to the console.

function logger(req, res, next) {
  console.log(req.originalUrl); // originalUrl is a property of req object which is used to get the url of the request.
  next(); // next() is used to call the next middleware function.
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Note:   users.js file has middleware def and exp.
// Remember:  Js rus from top to bottom. So if you want to use middleware function then you have to define it before the route. like if you want to use  every route/ everywhere  then you have to define it at the top most level.
// and if you want to use it for a particular route then you have to define it before that route.
// see the example below:
// app.get("/logger", logger, (req, res) => {
//   res.send("Hello World");
// });
