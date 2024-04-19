const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  recordingDate: { type: Date, required: true },
  soundFile: { type: String, required: true },
});

const User = mongoose.model('UserData', UserDataSchema);

module.exports = User; 