const express = require('express');
const Router = express.Router();
const User = require('./Schema');
const upload = require('./multer'); 
const fs = require('fs');
const path = require('path');

Router.post('/submit', upload.single('soundFile'), async (req, res) => {
  try {
    const { doctorName, patientName, patientAge, recordingDate } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file was uploaded' });
    }
    const soundFilePath=path.join(__dirname,'uploads/',req.file.filename);
    console.log(soundFilePath)
    const newUser = new User({
      doctorName,
      patientName,
      patientAge,
      recordingDate,
      soundFile: soundFilePath,
    });

    const UserData = await newUser.save();
    res.status(201).json(UserData);
    console.log(UserData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
Router.get('/display-data/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Recording not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Add a new route to serve the audio file
Router.get('/audio/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Recording not found' });
    }
    const soundFilePath = path.join(user.soundFile);
    if (!fs.existsSync(soundFilePath)) {
      return res.status(404).json({ error: 'Audio file not found' });
    }
    res.set('Content-Type', 'audio/mpeg');
    const fileStream = fs.createReadStream(soundFilePath);
    fileStream.pipe(res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Router.get('/display-data/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'Recording not found' });
//     }
//     const soundFilePath = path.join(user.soundFile);
//     console.log(soundFilePath);
//     if (!fs.existsSync(soundFilePath)) {
//       return res.status(404).json({ error: 'Audio file not found' });
//     }
//     res.set('Content-Type', 'audio/mpeg');
//     const fileStream = fs.createReadStream(soundFilePath);
//     fileStream.pipe(res);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = Router;