require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 9999;
const db = require('../db');
const cors = require('cors');

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// GET ALL
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const result = await db.query('SELECT * FROM restaurants');
    const restaurantRatingsData = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;');
    res.status(200).json({
      status: 'success',
      results: restaurantRatingsData.rows.length,
      data: { restaurants: restaurantRatingsData.rows },
    });
  } catch (err) {
    console.log(err);
  }
});

// GET ONE
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
      [req.params.id]
    );
    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// POST
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );
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

// UPDATE
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const previousVal = await db.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [req.params.id]
    );
    const result = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
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

// DELETE
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM restaurants where id = $1', [
      req.params.id,
    ]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
});

// ADD REVIEW
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query('INSERT INTO reviews(restaurant_id, name, review, rating) VALUES($1, $2, $3, $4) returning *',
    [req.params.id, req.body.name, req.body.review, req.body.rating]);
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`\n ~~ Server is listening on port ${PORT} ~~ \n`);
});
