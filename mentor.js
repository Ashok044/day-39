const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create a Mentor
router.post('/create', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Show all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate('students');
    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
