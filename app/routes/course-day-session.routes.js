module.exports = (app) => {
    const courseSessions = require('../controllers/course-day-session.controller');

    // Create a new CourseArticle
    app.post('/api/course-sessions', courseSessions.create);

    // Retrieve all CourseArticles
    app.get('/api/course-sessions', courseSessions.findAll);

    // Retrieve a single CourseArticle with courseSessionId
    app.get('/api/course-sessions/:courseSessionId', courseSessions.findOne);

    // Update a Note with courseSessionId
    app.put('/api/course-sessions/:courseSessionId', courseSessions.update);

    // Delete a Note with courseSessionId
    app.delete('/api/course-sessions/:courseSessionId', courseSessions.delete);

}