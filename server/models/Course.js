const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    public_id: String,
    freePreview: Boolean,
})

const courseSchema = new mongoose.Schema({
    instructorId: String,
    instructorName: String,
    date: Date,
    title: String,
    category: String,
    level: String,
    primaryLanguage: String,
    subtitle: String,
    description: String,
    image: String,
    welcomeMessage: String,
    pricing: Number,
    objectives: String,
    students: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String,
            paidAmount: String
        }
    ],
    curriculum : [lectureSchema],
    isPublished: Boolean,

})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;