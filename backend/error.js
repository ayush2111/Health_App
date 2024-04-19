const express=require('express');
const Router=express.Router();
Router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
  });
module.exports=Router;