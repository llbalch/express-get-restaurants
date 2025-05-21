const express = require("express");
const restRouter = express.Router();
const Restaurant = require("../models/Restaurant")
// import the seed data
// const seedRestaurant = require("../seedData");

// initializes the array with the seed data
// let restaurants = [
//   {
//     name: "AppleBees",
//     location: "Texas",
//     cuisine: "FastFood",
//   },
//   {
//     name: "LittleSheep",
//     location: "Dallas",
//     cuisine: "Hotpot",
//   },
//   {
//     name: "Spice Grill",
//     location: "Houston",
//     cuisine: "Indian",
//   },
// ]

// adding a new restaurant to the array
restRouter.post("/", async (req, res) => {
  try{
    const newRestaurant = await Restaurant.create(req.body)
    res.status(201).json(newRestaurant)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// returns all restaurants in the array
restRouter.get("/", async (req, res) => {
   try{
    const restaurants = await Restaurant.find()
    res.json(restaurants)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
  ;
});

// returns one restaurant in the array by id
restRouter.get("/:id", async (req, res) => {
   try{
    const foundRestaurant = await Restaurant.findByPk(req.params.id)
    res.json(foundRestaurant)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// updates restaurant with provided info at a specified id
restRouter.put("/:id", async (req, res) => {
     try{
    const [updated] = await Restaurant.update(req.body, {
      where: { id: req.params.id}
    })
    if (updated) {
      const updatedRestaurant = await Restaurant.findByPk(req.params.id)
      res.json(updatedRestaurant)
    } else {
      res.status(404).json({ error: "Restaurant not found" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// deletes restaurant at a specific id
restRouter.delete("/:id", async (req, res) => {
  try{
  const deleted = await Restaurant.destroy({ 
    where: { id: req.params.id }})
    if(deleted){
      res.json({ message: "Restaurant deleted" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  } 

});


module.exports = {
  restRouter,
};
