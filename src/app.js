const express = require("express");
const app = express();
const db = require("../db/connection");
const { restRouter } = require("../routes/restaurants")
const { check, validationResult } = require("express-validator");

//TODO: Create your GET Request Route Below:
// Middleware
app.use(express.json())
app.use(express.urlencoded())
app.use("/restaurants", restRouter)

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({});
  res.json(restaurants)
})

app.get("/restaurants/:id", async (req, res) => {
  const foundId = parseInt(req.params.id)
  const foundRestaurant = await Restaurant.findOne({ where: { foundId } })
  if (foundRestaurant) {
    res.json(foundRestaurant)
} else {
  res.status(404).json({ error: "Restaurant not found" })
}
})
// route for creating (adding) a new restaurant on the restaurant database
app.post("/restaurants", async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body)
  res.status(201).send("The array has been added with a new resaurant")
})
// route for updating (replacing) an exsisting restaurant with a new restaurant in the database based on ID in the route
app.put("/restaurants/:id", async (req, res) => {
  const updated = await Restaurant.update(req.body,
    { where: { id: req.params.id } }
  )
  res.json(updated)
})
// route for deleting (removing) a restaurant on the database based on the id in the route
app.delete("/restaurants/:id", async (req, res) => {
  const deleted = await Restaurant.destroy(
    { where: { id: req.params.id } }
  )
  if(deleted){
    res.status(200).send("Restaurant deleted successfully")
  } else {
    res.status(404).send()
  }
})



module.exports = app;
