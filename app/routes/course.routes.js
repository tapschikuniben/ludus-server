module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    const multer = require('multer');

    const storage = multer.memoryStorage({
        destination: function(req, file, cb) {
            cb(null, '')
        }
    })


    const filefilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }

    const upload = multer({ storage: storage, fileFilter: filefilter });


    // Create a new Course
    app.post('/api/courses', courses.create);

    // Retrieve all Courses
    app.get('/api/courses', courses.findAll);

    // Retrieve a single Course with courseId
    app.get('/api/courses/:courseId', courses.findOne);

    // Update a Course with courseId
    app.put('/api/courses/:courseId', courses.update);

    // Update a Daily Course session with courseId
    // app.put('/api/courses-daily-session/:courseId', uploadImage.single('courseimage'), uploadVideo.single('coursevideo'), courses.updateCourseDailySession);

    app.put('/api/courses-daily-session/:courseId', upload.fields([{
        name: 'courseimage',
        maxCount: 1
    }, {
        name: 'coursevideo',
        maxCount: 1
    }]), courses.updateCourseDailySession);

    // Delete a Course with courseId
    app.delete('/api/courses/:courseId', courses.delete);

}