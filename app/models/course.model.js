const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    number_of_days: { type: Number },
    course_title: { type: String },
    course_title: { type: String },
    course_instructor: { type: String },
    course_description: { type: String },
    schedule: { type: Array },
})

CourseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Courses', CourseSchema);