const CourseArticle = require('../models/course-article.model');

//Create new CourseArticle
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "CourseArticle content can not be empty"
        });
    }

    // Create a CourseArticle
    const courseArticle = new CourseArticle({
        article: req.body.article,
        filename: req.body.filename,
        linking_id: req.body.linking_id
    });

    // Save CourseArticle in the database
    courseArticle.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the courseArticle."
            });
        });
};

// Retrieve all courseArticles from the database.
exports.findAll = (req, res) => {
    CourseArticle.find()
        .then(courseArticles => {
            res.send(courseArticles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving courseArticles."
            });
        });
};

// Find a single courseArticle with a courseArticleId
exports.findOne = (req, res) => {
    CourseArticle.findById(req.params.courseArticleId)
        .then(courseArticle => {
            if (!courseArticle) {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            res.send(courseArticle);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving courseArticle with id " + req.params.courseArticleId
            });
        });
};

// Update a courseArticle
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "CourseArticle content can not be empty"
        });
    }

    // Find and update courseArticle with the request body
    CourseArticle.findByIdAndUpdate(req.params.courseArticleId, {
            article: req.body.article,
            filename: req.body.filename,
            linking_id: req.body.linking_id
        }, { new: true })
        .then(courseArticle => {
            if (!courseArticle) {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            res.send(courseArticle);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.courseArticleId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    CourseArticle.findByIdAndRemove(req.params.courseArticleId)
        .then(courseArticle => {
            if (!courseArticle) {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            res.send({ message: "CourseArticle deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseArticle not found with id " + req.params.courseArticleId
                });
            }
            return res.status(500).send({
                message: "Could not delete courseArticle with id " + req.params.courseArticleId
            });
        });
};