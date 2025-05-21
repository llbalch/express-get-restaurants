const express = require("express");
const restRouter = express.Router();
// import the seed data
const seedRestaurant = require("../seedData");

// initializes the array with the seed data
let restaurants = [
  {
    name: "AppleBees",
    location: "Texas",
    cuisine: "FastFood",
  },
  {
    name: "LittleSheep",
    location: "Dallas",
    cuisine: "Hotpot",
  },
  {
    name: "Spice Grill",
    location: "Houston",
    cuisine: "Indian",
  },
]

// adding a new restaurant to the array
restRouter.post("/", (req, res) => {
  restaurants.push(req.body);
  res.json({ restaurants });
});

// returns all restaurants in the array
restRouter.get("/", (req, res) => {
  res.json({ restaurants });
});

// returns one restaurant in the array by id
restRouter.get("/:id", (req, res) => {
  const index = Number(req.params.id) - 1;
  res.json(restaurants[index]);
});

// updates restaurant with provided info at a specified id
restRouter.put("/:id", (req, res) => {
  const index = Number(req.params.id) - 1;
  restaurants[index] = req.body
  res.json({ restaurants });
});

// deletes restaurant at a specific id
restRouter.delete("/:id", (req, res) => {
  const index = Number(req.params.id) - 1;
  restaurants.splice(index, 1);
  res.json({ restaurants });
});

module.exports = {
  restRouter,
};
