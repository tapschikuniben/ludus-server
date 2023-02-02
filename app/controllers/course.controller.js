const Course = require('../models/course.model.js');

const Aws = require('aws-sdk');

const s3 = new Aws.S3({
    accessKeyId: "AKIA2RVTJNGOEBMXXTHX",
    secretAccessKey: "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"
})

//Create new Course
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }

    // Create a Course
    const course = new Course({
        number_of_days: req.body.number_of_days,
        course_title: req.body.course_title,
        course_instructor: req.body.course_instructor,
        course_description: req.body.course_description,
        course_daily_sessions: req.body.course_daily_sessions
    });

    // Save Course in the database
    course.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the course."
            });
        });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    Course.find()
        .then(courses => {
            res.send(courses);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving courses."
            });
        });
};

// Find a single course with a courseId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send(course);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving course with id " + req.params.courseId
            });
        });
};

// Update a course
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }

    // Find and update course with the request body
    Course.findByIdAndUpdate(req.params.courseId, {
            number_of_days: req.body.number_of_days,
            course_title: req.body.course_title,
            course_instructor: req.body.course_instructor,
            course_description: req.body.course_description,
            course_daily_sessions: req.body.course_daily_sessions
        }, { new: true })
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send(course);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.courseId
            });
        });
};

// Update a course daily session
exports.updateCourseDailySession = (req, res) => {

    console.log("xxxxxxxxxxxx", req.files)


    returnedData = JSON.parse(req.body.course);

    const params = {
        s3: s3,
        Bucket: "ludus-web-api", // bucket that we made earlier
        Key: req.files.courseimage[0].originalname, // Name of the image
        Body: req.files.courseimage[0].buffer, // Body which will contain the image in buffer format
        ACL: "public-read-write", // defining the permissions to get the public link
        ContentType: "image/jpeg" // Necessary to define the image content-type to view the photo in the browser with the link
    };


    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }

    s3.upload(params, (error, data) => {

        returnedData.course_daily_sessions[returnedData.course_daily_sessions.length - 1].imageUrl = data.Location;

        // Find and update course with the request body
        Course.findByIdAndUpdate(req.params.courseId, {
                number_of_days: returnedData.number_of_days,
                course_title: returnedData.course_title,
                course_instructor: returnedData.course_instructor,
                course_description: returnedData.course_description,
                course_daily_sessions: returnedData.course_daily_sessions
            }, { new: true })
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: "Course not found with id " + req.params.courseId
                    });
                }
                res.send(course);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Course not found with id " + req.params.courseId
                    });
                }
                return res.status(500).send({
                    message: "Something wrong updating note with id " + req.params.courseId
                });
            });
    })

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    Course.findByIdAndRemove(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            res.send({ message: "Course deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Course not found with id " + req.params.courseId
                });
            }
            return res.status(500).send({
                message: "Could not delete course with id " + req.params.courseId
            });
        });
};