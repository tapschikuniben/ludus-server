const CourseImage = require('../models/course-image.model');

//Create new CourseImage
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "CourseImage content can not be empty"
        });
    }

    // Create a CourseImage
    const courseImage = new CourseImage({
        image: req.body.image,
        filename: req.body.filename,
        linking_id: req.body.linking_id
    });

    // Save CourseImage in the database
    courseImage.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the courseImage."
            });
        });
};

// Retrieve all courseImages from the database.
exports.findAll = (req, res) => {
    CourseImage.find()
        .then(courseImages => {
            res.send(courseImages);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving courseImages."
            });
        });
};

// Find a single courseImage with a courseImageId
exports.findOne = (req, res) => {
    CourseImage.findById(req.params.courseImageId)
        .then(courseImage => {
            if (!courseImage) {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            res.send(courseImage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving courseImage with id " + req.params.courseImageId
            });
        });
};

// Update a courseImage
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "CourseImage content can not be empty"
        });
    }

    // Find and update courseImage with the request body
    CourseImage.findByIdAndUpdate(req.params.courseImageId, {
            image: req.body.image,
            filename: req.body.filename,
            linking_id: req.body.linking_id
        }, { new: true })
        .then(courseImage => {
            if (!courseImage) {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            res.send(courseImage);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.courseImageId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    CourseImage.findByIdAndRemove(req.params.courseImageId)
        .then(courseImage => {
            if (!courseImage) {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            res.send({ message: "CourseImage deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseImage not found with id " + req.params.courseImageId
                });
            }
            return res.status(500).send({
                message: "Could not delete courseImage with id " + req.params.courseImageId
            });
        });
};