const mongoose = require('mongoose');

const PackSchema = mongoose.Schema({
    pack_title: { type: String },
    pack_instructor: { type: String },
    pack_description: { type: String },
    pack_daily_sessions: { type: Array }
})

PackSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Packs', PackSchema);