module.exports = (app) => {
    const courseVideos = require('../controllers/course-video.controller.js');

    // Create a new CourseVideo
    app.post('/api/course-videos', courseVideos.create);

    // Retrieve all CourseVideos
    app.get('/api/course-videos', courseVideos.findAll);

    // Retrieve a single CourseVideo with courseVideoId
    app.get('/api/course-videos/:courseVideoId', courseVideos.findOne);

    // Update a Note with courseVideoId
    app.put('/api/course-videos/:courseVideoId', courseVideos.update);

    // Delete a Note with courseVideoId
    app.delete('/api/course-videos/:courseVideoId', courseVideos.delete);

}