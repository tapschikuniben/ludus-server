const mongoose = require('mongoose');

const CourseImageSchema = mongoose.Schema({
    image: { type: String },
    filename: { type: String },
    linking_id: { type: String },
})

CourseImageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CourseImages', CourseImageSchema);