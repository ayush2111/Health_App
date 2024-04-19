// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const Router = require('./Routes');
const connectDB = require('./connect');
const cors=require('cors')
app.use(cors());
app.use(express.json());
connectDB();
app.use(Router);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
