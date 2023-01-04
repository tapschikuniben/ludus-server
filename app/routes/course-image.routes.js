module.exports = (app) => {
    const courseImages = require('../controllers/course-image.controller.js');

    // Create a new CourseImage
    app.post('/api/course-images', courseImages.create);

    // Retrieve all CourseImages
    app.get('/api/course-images', courseImages.findAll);

    // Retrieve a single CourseImage with courseImageId
    app.get('/api/course-images/:courseImageId', courseImages.findOne);

    // Update a Note with courseImageId
    app.put('/api/course-images/:courseImageId', courseImages.update);

    // Delete a Note with courseImageId
    app.delete('/api/course-images/:courseImageId', courseImages.delete);

}