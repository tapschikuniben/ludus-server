module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    const multer = require('multer');

    const storage = multer.memoryStorage({
        destination: function(req, file, cb) {
            cb(null, '')
        }
    })


    const filefilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'text/plain') {
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
    app.put('/api/courses-file-image/:courseId', upload.single('courseimage'), courses.updateFile);

    app.put('/api/courses-file-video/:courseId', upload.single('coursevideo'), courses.updateFile);

    app.delete('/api/courses/:courseId', courses.delete);

}