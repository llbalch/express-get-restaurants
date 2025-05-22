const express = require("express");
const restRouter = express.Router();
const Restaurant = require("../models/index");
const { check, validationResult } = require("express-validator");

// adding a new restaurant to the array
restRouter.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      } else {
        const newRestaurant = await Restaurant.create(req.body);
        const allRestaurants = await Restaurant.findAll()
        res.status(201).json(allRestaurants);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// returns all restaurants in the array
restRouter.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  restRouter } 
