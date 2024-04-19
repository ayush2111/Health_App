// connect.js
require('dotenv').config();
const mongoose = require('mongoose');
const gridfsStream=require('gridfs-stream')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const conn=mongoose.connection;
    const gfs=gridfsStream(conn.db,mongoose.mongo);
    gfs.collection('uploads');
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
