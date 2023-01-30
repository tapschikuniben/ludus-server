const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    number_of_days: { type: Number, required: true },
    course_title: { type: String, required: true },
    course_instructor: { type: String, required: true },
    course_description: { type: String, required: true },
    course_daily_sessions: { type: Array, required: true },
})

CourseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Courses', CourseSchema);