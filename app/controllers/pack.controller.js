const Pack = require('../models/pack.model.js');

//Create new Pack
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Pack content can not be empty"
        });
    }

    // Create a Pack
    const pack = new Pack({
        packs_images: req.body.packs_images,
        number_of_weeks: req.body.number_of_weeks,
        pack_title: req.body.pack_title,
        pack_instructor: req.body.pack_instructor,
        description: req.body.description,
        pack_daily_sessions: req.body.pack_daily_sessions
    });

    // Save Pack in the database
    pack.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the pack."
            });
        });
};

// Retrieve all packs from the database.
exports.findAll = (req, res) => {
    Pack.find()
        .then(packs => {
            res.send(packs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving packs."
            });
        });
};

// Find a single pack with a packId
exports.findOne = (req, res) => {
    Pack.findById(req.params.packId)
        .then(pack => {
            if (!pack) {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            res.send(pack);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving pack with id " + req.params.packId
            });
        });
};

// Update a pack
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Pack content can not be empty"
        });
    }

    // Find and update pack with the request body
    Pack.findByIdAndUpdate(req.params.packId, {
            packs_images: req.body.packs_images,
            number_of_weeks: req.body.number_of_weeks,
            pack_title: req.body.pack_title,
            pack_instructor: req.body.pack_instructor,
            description: req.body.description,
            pack_daily_sessions: req.body.pack_daily_sessions
        }, { new: true })
        .then(pack => {
            if (!pack) {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            res.send(pack);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.packId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Pack.findByIdAndRemove(req.params.packId)
        .then(pack => {
            if (!pack) {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            res.send({ message: "Pack deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Pack not found with id " + req.params.packId
                });
            }
            return res.status(500).send({
                message: "Could not delete pack with id " + req.params.packId
            });
        });
};