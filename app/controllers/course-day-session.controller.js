const CourseSession = require('../models/course-day-session.model');

//Create new CourseSession
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "CourseSession content can not be empty"
        });
    }

    // Create a CourseSession
    const courseSession = new CourseSession({
        course_id: req.body.course_id,
        category: req.body.category,
        day: req.body.day,
        is_article_or_vedio: req.body.is_article_or_vedio,
        tags: req.body.tags,
        title: req.body.title,
        description: req.body.description,
        learning: req.body.learning,
        preferences: req.body.preferences,
        points_assigned: req.body.points_assigned,
        imageUrl: req.body.imageUrl,
        vedioUrl: req.body.vedioUrl,
        articleUrl: req.body.articleUrl,
    });

    // Save CourseSession in the database
    courseSession.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the courseSession."
            });
        });
};

// Retrieve all courseSessions from the database.
exports.findAll = (req, res) => {
    CourseSession.find()
        .then(courseSessions => {
            res.send(courseSessions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving courseSessions."
            });
        });
};

// Find a single courseSession with a courseSessionId
exports.findOne = (req, res) => {
    CourseSession.findById(req.params.courseSessionId)
        .then(courseSession => {
            if (!courseSession) {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            res.send(courseSession);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving courseSession with id " + req.params.courseSessionId
            });
        });
};

// Update a courseSession
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "CourseSession content can not be empty"
        });
    }

    // Find and update courseSession with the request body
    CourseSession.findByIdAndUpdate(req.params.courseSessionId, {
            course_id: req.body.course_id,
            category: req.body.category,
            day: req.body.day,
            is_article_or_vedio: req.body.is_article_or_vedio,
            tags: req.body.tags,
            title: req.body.title,
            description: req.body.description,
            learning: req.body.learning,
            preferences: req.body.preferences,
            points_assigned: req.body.points_assigned,
            imageUrl: req.body.imageUrl,
            vedioUrl: req.body.vedioUrl,
            articleUrl: req.body.articleUrl,
        }, { new: true })
        .then(courseSession => {
            if (!courseSession) {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            res.send(courseSession);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.courseSessionId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    CourseSession.findByIdAndRemove(req.params.courseSessionId)
        .then(courseSession => {
            if (!courseSession) {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            res.send({ message: "CourseSession deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseSession not found with id " + req.params.courseSessionId
                });
            }
            return res.status(500).send({
                message: "Could not delete courseSession with id " + req.params.courseSessionId
            });
        });
};