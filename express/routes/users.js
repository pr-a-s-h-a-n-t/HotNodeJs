// all of routes is going to be in this file lets imagine there are 100 different routes are there so this file will become huge and difficult to deal with, so resolve this issue express came with concept with  router.

// Express Router: it is a mini express application which can be used to perform different routes operations on it and then we can export it to our main application.

const express = require("express");

// set up a router
const router = express.Router();

//ejs
// app.set("view engine", "ejs");
router.get("/", (req, res) => {
  // query string
  // console.log(req.query, "query"); // query is a property of req object which is used to get the query string from the url.

  //params
  console.log(req.params, "params"); // params is a property of req object which is used to get the data from the url.

  res.send("User List");
});

router.get("/new", (req, res) => {
  res.render("users/new", { name: "Tony" });
});

//create a User
router.post("/", (req, res) => {
  isValid = true;
  if (isValid) {
    //create a new user and redirect
    users.push({ name: req.body.name });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error");
    res.render("users/new", { name: req.body.name });
  }
});

// Get  a User data from db dynamically based on id.
// router.get("/:userId", (req, res) => {
//   res.send(`Get a User having ID- ${req.params.userId}`);
// });

// Update a User
// router.put("/:userId", (req, res) => {
//   res.send(`Update a User having ID- ${req.params.userId}`);
// });

// Delete a User
// router.delete("/:userId", (req, res) => {
//   res.send(`Delete a User having ID- ${req.params.userId}`);
// });

//clean and better approach

router
  .route("/:userId")
  .get((req, res) => {
    console.log(req.user); //  we are getting this data from the params function. we are getting the user data from the users array based on the userId.
    res.send(`Get a User having ID- ${req.params.userId}`);
  })
  .put((req, res) => {
    res.send(`Update a User having ID- ${req.params.userId}`);
  })
  .delete((req, res) => {
    res.send(`Delete a User having ID- ${req.params.userId}`);
  });

// In the above code we are defining a route for a particular user and then we are chaining all the methods to it. so if we have to add more methods to it we can simply add it to the chain.

//   simple words -- we are defining a route for at one location and all the other request are matching that routes.

// params function(Middleware )

// Q. what is middleware function?
// A. middleware function is a function which is executed between the request and response. it is used to perform some operations on the request and then we can send the response.

// Q. what is params function?
// A. params function is a function which is used to get the data from the url and then we can use that data in our application. for example we can get the user id from the url and then we can use that id to get the data from the database, after that we can return the response. we can also use this function to validate the data.

const users = [
  { name: "John", age: 20 },
  { name: "Smith", age: 30 },
  { name: "Sarah", age: 40 },
];

router.param("userId", (req, res, next, userId) => {
  //   console.log(`User ID is ${userId}`);
  req.user = users[userId]; // we are getting the user data from the users array based on the userId.

  // now we don't have to write this code in every route we can simply use the req.user to get the user data.
  //  this saves us from writing the same code again and again.
  // this is the power of middleware function.

  next(); // next is used to move to the next middleware function.
});

// export router
module.exports = router;
