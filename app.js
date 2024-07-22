const express = require('express');
const connectDB = require('./config/db');
const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

const app = express();
connectDB();
app.use(express.json());

app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
