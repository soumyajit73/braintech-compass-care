const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');

// @route   GET /api/doctors/all
// @desc    Get all doctors
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('fullName email')
      .lean();
    
    // Get doctor profiles with specialty
    const doctorProfiles = await Promise.all(
      doctors.map(async (doctor) => {
        const profile = await Doctor.findOne({ userId: doctor._id });
        return {
          _id: doctor._id,
          fullName: doctor.fullName,
          email: doctor.email,
          specialty: profile?.specialty || 'General',
          experience: profile?.experience || 0
        };
      })
    );

    res.json({
      success: true,
      doctors: doctorProfiles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/doctors/my-appointments
// @desc    Get doctor's appointments
// @access  Private (Doctor only)
router.get('/my-appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user._id })
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

// @route   PATCH /api/doctors/appointment/:id/status
// @desc    Update appointment status (accept/decline)
// @access  Private (Doctor only)
router.patch('/appointment/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    // Validate status
    if (!['accepted', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find appointment and verify it belongs to this doctor
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    res.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;