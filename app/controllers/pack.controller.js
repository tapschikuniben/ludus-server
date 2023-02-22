const Pack = require('../models/pack.model.js');

const Aws = require('aws-sdk');
const fileSystem = require('fs');


const s3 = new Aws.S3({
    accessKeyId: "AKIA2RVTJNGOEBMXXTHX",
    secretAccessKey: "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"
})

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
        pack_title: req.body.pack_title,
        pack_instructor: req.body.pack_instructor,
        pack_description: req.body.pack_description,
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
            pack_title: req.body.pack_title,
            pack_instructor: req.body.pack_instructor,
            pack_description: req.body.pack_description,
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

// Update a pack daily session
exports.updateFile = (req, res) => {

    returnedData = JSON.parse(req.body.pack);

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Pack content can not be empty"
        });
    }


    if (req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/jpg") {
        const params = {
            s3: s3,
            Bucket: "ludus-web-api", // bucket that we made earlier
            Key: req.file.originalname, // Name of the image
            Body: req.file.buffer, // Body which will contain the image in buffer format
            ACL: "public-read-write", // defining the permissions to get the public link
            ContentType: "image/jpeg" // Necessary to define the image content-type to view the photo in the browser with the link
        };

        s3.upload(params, (error, data) => {
            image_data = JSON.parse(req.body.file_data);
            session_index = req.body.session_index;

            returnedData.pack_daily_sessions[session_index].imageInfo.push({ imageUrl: data.Location, caption: image_data.caption, title: image_data.title, accessories: image_data.accessories });
            savePackSession();
        })
    }

    if (req.file.mimetype == "video/mp4") {
        const params = {
            s3: s3,
            Bucket: "ludus-web-api", // bucket that we made earlier
            Key: req.file.originalname, // Name of the image
            Body: req.file.buffer, // Body which will contain the image in buffer format
            ACL: "public-read-write", // defining the permissions to get the public link
            ContentType: "video/mp4" // Necessary to define the image content-type to view the photo in the browser with the link
        };

        s3.upload(params, (error, data) => {
            video_data = JSON.parse(req.body.file_data);
            session_index = req.body.session_index;

            returnedData.pack_daily_sessions[session_index].videoInfo.push({ videoUrl: data.Location, caption: video_data.caption, title: video_data.title, accessories: video_data.accessories });
            savePackSession();
        })
    }

    // Find and update pack with the request body
    let savePackSession = () => {
        Pack.findByIdAndUpdate(req.params.packId, {
                pack_daily_sessions: returnedData.pack_daily_sessions
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
    }


};

exports.updatePackDailySession = (req, res) => {

    returnedData = JSON.parse(req.body.pack);

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Pack content can not be empty"
        });
    }

    const keys = Object.keys(req.files);

    const length = Object.keys(req.files).length;

    Object.values(req.files).forEach(val => {
        const params = {
            s3: s3,
            Bucket: "ludus-web-api", // bucket that we made earlier
            Key: val[0].originalname, // Name of the image
            Body: val[0].buffer, // Body which will contain the image in buffer format
            ACL: "public-read-write", // defining the permissions to get the public link
            ContentType: val[0].mimetype // Necessary to define the image content-type to view the photo in the browser with the link
        };


        s3.upload(params, (error, data) => {
            if (val[0].mimetype == "image/jpeg" || val[0].mimetype == "image/jpg") {
                returnedData.pack_daily_sessions[returnedData.pack_daily_sessions.length - 1].imageUrl = data.Location;
                savePackSession();
            }

            if (val[0].mimetype == "video/mp4") {
                returnedData.pack_daily_sessions[returnedData.pack_daily_sessions.length - 1].videoUrl = data.Location;
                savePackSession();
            }
        })
    })

    // let result = await promise;

    // Find and update pack with the request body
    let savePackSession = () => {
        Pack.findByIdAndUpdate(req.params.packId, {
                number_of_days: returnedData.number_of_days,
                pack_title: returnedData.pack_title,
                pack_instructor: returnedData.pack_instructor,
                pack_description: returnedData.pack_description,
                pack_daily_sessions: returnedData.pack_daily_sessions
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
    }


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