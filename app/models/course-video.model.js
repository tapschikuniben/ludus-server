const mongoose = require('mongoose');

const CourseVideoSchema = mongoose.Schema({
    video: { type: String },
    filename: { type: String },
    linking_id: { type: String },
})

CourseVideoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CourseVideos', CourseVideoSchema);