const CourseVideo = require('../models/course-video.model');

//Create new CourseVideo
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "CourseVideo content can not be empty"
        });
    }

    // Create a CourseVideo
    const courseVideo = new CourseVideo({
        video: req.body.video,
        filename: req.body.filename,
        linking_id: req.body.linking_id
    });

    // Save CourseVideo in the database
    courseVideo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the courseVideo."
            });
        });
};

// Retrieve all courseVideos from the database.
exports.findAll = (req, res) => {
    CourseVideo.find()
        .then(courseVideos => {
            res.send(courseVideos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving courseVideos."
            });
        });
};

// Find a single courseVideo with a courseVideoId
exports.findOne = (req, res) => {
    CourseVideo.findById(req.params.courseVideoId)
        .then(courseVideo => {
            if (!courseVideo) {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            res.send(courseVideo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving courseVideo with id " + req.params.courseVideoId
            });
        });
};

// Update a courseVideo
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "CourseVideo content can not be empty"
        });
    }

    // Find and update courseVideo with the request body
    CourseVideo.findByIdAndUpdate(req.params.courseVideoId, {
            video: req.body.video,
            filename: req.body.filename,
            linking_id: req.body.linking_id
        }, { new: true })
        .then(courseVideo => {
            if (!courseVideo) {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            res.send(courseVideo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.courseVideoId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    CourseVideo.findByIdAndRemove(req.params.courseVideoId)
        .then(courseVideo => {
            if (!courseVideo) {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            res.send({ message: "CourseVideo deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseVideo not found with id " + req.params.courseVideoId
                });
            }
            return res.status(500).send({
                message: "Could not delete courseVideo with id " + req.params.courseVideoId
            });
        });
};