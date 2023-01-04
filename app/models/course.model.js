const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    number_of_days: { type: Number },
    course_title: { type: String },
    course_title: { type: String },
    course_instructor: { type: String },
    course_description: { type: String },
    date: { type: String },
    article_or_vedio: { type: String },
    tags: { type: String },
    title: { type: String },
    description: { type: String },
    learning: { type: String },
    preferences: { type: Array },
    points_assigned: { type: Number },
    linking_id: { type: String },
})

CourseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Courses', CourseSchema);