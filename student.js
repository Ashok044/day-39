const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create a Student
router.post('/create', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Assign a student to a mentor
router.post('/:studentId/assign-mentor/:mentorId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const mentor = await Mentor.findById(req.params.mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ error: 'Student or Mentor not found' });
    }

    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    student.mentor = mentor._id;
    mentor.students.push(student._id);

    await student.save();
    await mentor.save();

    res.status(200).json({ message: 'Mentor assigned successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Show previously assigned mentor for a particular student
router.get('/:studentId/previous-mentors', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('previousMentors');
    res.status(200).json(student.previousMentors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
