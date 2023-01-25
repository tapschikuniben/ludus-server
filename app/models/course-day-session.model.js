const mongoose = require('mongoose');

const CourseDaySessionSchema = mongoose.Schema({
    course_id: { type: String },
    category: { type: String },
    day: { type: String },
    is_article_or_vedio: { type: String },
    tags: { type: String },
    title: { type: String },
    description: { type: String },
    learning: { type: String },
    preferences: { type: [] },
    points_assigned: { type: Number },
    imageUrl: { type: String },
    vedioUrl: { type: String },
    articleUrl: { type: String },
})

CourseDaySessionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CourseDaySessions', CourseDaySessionSchema);