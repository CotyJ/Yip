require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;


// GET ALL
app.get('/api/v1/restaurants', (req, res) => {
  console.log('GET ALL Restaurants');

  try {
  //
  } catch (err) {
    console.log(err);
  }
});


// GET ONE
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log('GET ALL Restaurants');

  try {
  //
  } catch (err) {
    console.log(err);
  }
});



// POST
app.post('/api/v1/restaurants', (req, res) => {
  console.log('Post a restaurant');

  try {
    //
  } catch (err) {
    console.log(err);
  }
});


// UPDATE
app.put('/api/v1/restaurants', (req, res) => {
  console.log('Update a restaurant');

  try {
  //
  } catch (err) {
    console.log(err);
  }
});


// DELETE
app.delete('/api/v1/restaurants', (req, res) => {
  console.log('Delete a restaurant');

  try {
  //
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`\n ~~ Server is listening on port ${PORT} ~~ \n`);
});
