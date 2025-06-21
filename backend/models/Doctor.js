const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    default: 'General Physician'
  },
  qualifications: [{
    type: String
  }],
  experience: {
    type: Number,
    default: 0
  },
  bio: String,
  consultationFee: {
    type: Number,
    default: 500
  },
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);