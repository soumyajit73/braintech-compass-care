const express = require('express');
const router = express.Router();
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/auth');
const Scan = require('../models/Scan');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'scan-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept image files
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// @route   POST /api/scans/upload
// @desc    Upload MRI scan and get prediction
// @access  Private (Patient only)
router.post('/upload', protect, upload.single('scan'), async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can upload scans' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Prepare the file for ML API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));
    
    // Call your ML API
    const mlApiUrl = process.env.ML_API_URL || 'https://arittrabag-mri-h4b.hf.space/detect';
    
    try {
      const mlResponse = await axios.post(mlApiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 60000 // 60 second timeout
      });

      // Save scan with ML results
      const scan = await Scan.create({
        patientId: req.user._id,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        status: 'analyzed',
        mlResults: mlResponse.data, // Store the entire ML response
        uploadDate: new Date()
      });

      res.json({
        success: true,
        scan: {
          id: scan._id,
          filename: scan.originalName,
          uploadDate: scan.uploadDate,
          status: 'Analyzed',
          confidence: `${Math.round(mlResponse.data.dementiaAnalysis.confidences[mlResponse.data.dementiaAnalysis.predictedClass] * 100)}%`
        }
      });

    } catch (mlError) {
      console.error('ML API Error:', mlError);
      
      // Still save the scan but mark as failed
      const scan = await Scan.create({
        patientId: req.user._id,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        status: 'failed',
        error: mlError.message,
        uploadDate: new Date()
      });
      
      res.status(500).json({ 
        message: 'Failed to analyze scan',
        error: 'ML service temporarily unavailable'
      });
    }

  } catch (error) {
    console.error('Upload error:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/scans/my-scans
// @desc    Get patient's scan history
// @access  Private (Patient only)
router.get('/my-scans', protect, async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can view scans' });
    }

    const scans = await Scan.find({ patientId: req.user._id })
      .sort({ uploadDate: -1 });

    res.json({
      success: true,
      scans: scans.map(scan => ({
        id: scan._id,
        filename: scan.originalName,
        uploadDate: scan.uploadDate.toISOString().split('T')[0],
        status: scan.status === 'analyzed' ? 'Analyzed' : 
                scan.status === 'failed' ? 'Failed' : 'Processing',
        confidence: scan.status === 'analyzed' && scan.mlResults 
          ? `${Math.round(scan.mlResults.dementiaAnalysis.confidences[scan.mlResults.dementiaAnalysis.predictedClass] * 100)}%`
          : 'N/A'
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/scans/:id/report
// @desc    Get detailed scan report
// @access  Private (Patient only)
router.get('/:id/report', protect, async (req, res) => {
  try {
    const scan = await Scan.findOne({
      _id: req.params.id,
      patientId: req.user._id
    });

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    if (scan.status !== 'analyzed' || !scan.mlResults) {
      return res.status(400).json({ message: 'Report not available' });
    }

    const mlData = scan.mlResults;
    
    res.json({
      success: true,
      report: {
        scanId: scan._id,
        fileName: scan.originalName,
        uploadDate: scan.uploadDate,
        
        // MRI Validation
        isMRI: mlData.isMRI,
        mriConfidence: Math.round(mlData.mriConfidence * 100),
        
        // Dementia Analysis
        diagnosis: mlData.dementiaAnalysis.predictedClass,
        confidence: Math.round(mlData.dementiaAnalysis.confidences[mlData.dementiaAnalysis.predictedClass] * 100),
        
        // All confidence scores
        allConfidences: Object.entries(mlData.dementiaAnalysis.confidences).map(([key, value]) => ({
          condition: key,
          confidence: Math.round(value * 100)
        })).sort((a, b) => b.confidence - a.confidence),
        
        // AI Insights (the detailed report from ML)
        insights: mlData.dementiaAnalysis.insights
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;