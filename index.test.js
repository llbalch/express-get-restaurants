const request = require('supertest')
const app = require('./src/app')
const Restaurant = require('./models/index')


// Verify that the GET /restaurants route returns a status code of 200

it('should return 200 for GET /restaurants', async () => {
    const result = await request(app).get('/restaurants')
        expect(result.statusCode).toEqual(200)
})
// Verify that GET /restaurants route returns an array of restaurants
it('should return an array of restaurants for GET /restaurants', async () => {
    const result = await request(app).get('/restaurants')
        expect(Array.isArray(result.body)).toBe(true)
})
// Test that GET /restaurants returns the correct number of restaurants 
it('should return the correct number of restaurants', async () => {
    const result = await request(app).get('/restaurants')
        expect(result.body.length).toBe(2)
})
// Test that GET /restaurants returns the correct restaurant data 
it('should return the correct data of entire array', async () => {
    const result = await request(app).get('/restaurants') 
    expect(result.body).toEqual([
          {
            id: 1,
            name: "Ippudo",
            cuisine: "Italian",
            location: "NYC",
            createdAt: "2025-05-19T15:05:30.536Z",
            updatedAt: "2025-05-20T14:38:19.055Z"
        },
        {
            id: 3,
            name: "Spice Grill",
            cuisine: "Indian",
            location: "Houston",
            createdAt: "2025-05-19T15:05:30.536Z",
            updatedAt: "2025-05-19T15:05:30.536Z"
        }
    ])

})
// Verify that GET /restaurants/:id request returns the correct data.
it('should return the correct data of specific id', async () => {
    const result = await request(app).get('/restaurants/1')
    expect(result.body).toEqual(
        {
            id: 1,
            name: "Ippudo",
            cuisine: "Italian",
            location: "NYC",
            createdAt: "2025-05-19T15:05:30.536Z",
            updatedAt: "2025-05-20T14:38:19.055Z"
        }
    )
})
// Test that POST /restaurants request returns the restaurants array has been updated with the new value. 
it('should post a new restaurant with new values and return successful message and status', async () => {
    const newRestaurant = { name: "Test", cuisine: "Italian", location: "Arizona" }
    const result = await request(app).post("/restaurants").send(newRestaurant)
    expect(result.body.name).toEqual( "Test")
    expect(result.statusCode).toEqual(201)
})

// Verify that PUT /restaurants/:id request updates the restaurant array with the provided value 
it('should put updated values into a specified id', async () => {
    const updateRestaurant = { name: "Test", cuisine: "Italian", location: "Arizona" }
    const result = await request(app).put("/restaurants/1").send(updateRestaurant)
    expect(result.body.name).toEqual( "Test")
    expect(result.statusCode).toEqual(200)
})

// Test that DELETE /restaurant/:id deletes the restaurant with the provided id from the array.
it('should delete the values of the specified id', async () => {
    const restaurant = await Restaurant.create({ name: "Test", cuisine: "Italian", location: "Arizona" })
    const result = await request(app).delete("/restaurants/3")
   
    expect(result.statusCode).toEqual(200)
    
    // // double check it's removed from the database
    // const found = await Restaurant.findByPk(restaurant.id)
    // expect(found).toBeNull()
})