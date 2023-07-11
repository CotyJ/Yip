require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 9999;
const db = require("../db")

// Middleware
app.use(morgan('tiny'));
app.use(express.json());

// GET ALL
app.get('/api/v1/restaurants', async (req, res) => {
  console.log("HI")

  try {
    const result = await db.query('SELECT * FROM restaurants');
    console.log(result.rows);

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: { restaurants: result.rows },
    });
  } catch (err) {
    console.log(err);
  }
});


// GET ONE
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log('GET ALL Restaurants');
  console.log(req.params);

  try {
  res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});



// POST
app.post('/api/v1/restaurants', (req, res) => {
  console.log('Post a restaurant');
  console.log(req.body);


  try {
    //
  } catch (err) {
    console.log(err);
  }
});


// UPDATE
app.put('/api/v1/restaurants', (req, res) => {
  console.log('Update a restaurant');
  console.log(req.params);
  console.log(req.body);



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
  res.status(204).send();
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`\n ~~ Server is listening on port ${PORT} ~~ \n`);
});
