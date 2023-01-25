const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    id: String,
    imageUrl: String,
    imageTitle: String,
    imageDesc: String,
    uploaded: { type: Date, default: Date.now },
})

GallerySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Gallery', GallerySchema);