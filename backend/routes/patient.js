const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/patients/book-appointment
// @desc    Book a new appointment
// @access  Private (Patient only)
router.post('/book-appointment', protect, async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body;

    // Validate
    if (!doctorId || !appointmentDate || !timeSlot) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Get doctor details
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patientId: req.user._id,
      patientName: req.user.fullName,
      doctorId,
      doctorName: doctor.fullName,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason: reason || 'General Consultation',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/patients/my-appointments
// @desc    Get patient's appointments
// @access  Private (Patient only)
router.get('/my-appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;