const mongoose = require('mongoose');

const PackSchema = mongoose.Schema({
    packs_images: { type: Array },
    number_of_weeks: { type: Number },
    pack_title: { type: String },
    pack_instructor: { type: String },
    description: { type: String },
})

PackSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Packs', PackSchema);