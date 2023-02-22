const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    email_address: { type: String },
    access_level: { type: String },
    password: { type: String },
    status: { type: String },
    created_by: { type: String },
    registered_sport: { type: String },
    date_of_birth: { type: Number },
    nationality: { type: String },
    created_date: {},
})

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', UserSchema);