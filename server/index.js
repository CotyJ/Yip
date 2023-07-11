require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`\nServer is listening on port ${PORT} \n`)
})
