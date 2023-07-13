require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 9999;
const db = require("../db");
const cors = require("cors");

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// GET ALL
app.get('/api/v1/restaurants', async (req, res) => {
  console.log("GET ALL restaurants");
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
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log("GET ONE restaurant");
  try {
    const result = await db.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id,]);
    console.log(result.rows[0]);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// POST
app.post('/api/v1/restaurants', async (req, res) => {
  console.log('POST a restaurant');
  try {
    const result = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_range]);
    // console.log(result);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// UPDATE
app.put('/api/v1/restaurants/:id', async (req, res) => {
  console.log('Update a restaurant');
  try {

    const previousVal = await db.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id]);
    console.log("Old", previousVal.rows[0]);

    const result = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]);
      console.log("New", result.rows[0])
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: result.rows[0],
      }
    })
  } catch (err) {
    console.log(err);
  }
});


// DELETE
app.delete('/api/v1/restaurants', async (req, res) => {
  console.log('Delete a restaurant');
  try {
    const result = await db.query('DELETE * FROM restaurants where id = $1', [req.params.id]);
    res.status(204).json({
      status: 'success',
    })
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`\n ~~ Server is listening on port ${PORT} ~~ \n`);
});
