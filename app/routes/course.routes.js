module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    // Create a new Course
    app.post('/api/courses', courses.create);

    // Retrieve all Courses
    app.get('/api/courses', courses.findAll);

    // Retrieve a single Course with courseId
    app.get('/api/courses/:courseId', courses.findOne);

    // Update a Note with courseId
    app.put('/api/courses/:courseId', courses.update);

    // Delete a Note with courseId
    app.delete('/api/courses/:courseId', courses.delete);

}