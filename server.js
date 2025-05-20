const db = require("./db/connection");
const app = require("./src/app");

// TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants)
})

const port = 3000;

app.listen(port, async () => {
  await db.sync();
  console.log(`Listening at http://localhost:${port}/restaurants`);
});
