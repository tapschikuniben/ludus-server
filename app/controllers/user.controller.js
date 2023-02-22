const User = require('../models/user.model.js');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Create new User
exports.create = (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        access_level: req.body.access_level,
        password: bcrypt.hashSync(req.body.password, 8),
        status: req.body.status,
        created_by: req.body.created_by,
        registered_sport: req.body.registered_sport,
        date_of_birth: req.body.date_of_birth,
        nationality: req.body.nationality,
        created_date: req.body.created_date
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the pack."
            });
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving user with id " + req.params.userId
            });
        });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            access_level: req.body.access_level,
            password: bcrypt.hashSync(req.body.password, 8),
            status: req.body.status,
            created_by: req.body.created_by,
            registered_sport: req.body.registered_sport,
            date_of_birth: req.body.date_of_birth,
            nationality: req.body.nationality,
            created_date: req.body.created_date
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.userId
            });
        });
};

// Update a user password
exports.update_password = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            access_level: req.body.access_level,
            password: bcrypt.hashSync(req.body.password, 8),
            status: req.body.status,
            created_by: req.body.created_by,
            registered_sport: req.body.registered_sport,
            date_of_birth: req.body.date_of_birth,
            nationality: req.body.nationality,
            created_date: req.body.created_date
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.userId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};