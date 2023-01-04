const mongoose = require('mongoose');

const CourseArticleSchema = mongoose.Schema({
    article: { type: String },
    filename: { type: String },
    linking_id: { type: String },
})

CourseArticleSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CourseArticles', CourseArticleSchema);