module.exports = (app) => {
    const courseArticles = require('../controllers/course-article.controller.js');

    // Create a new CourseArticle
    app.post('/api/course-articles', courseArticles.create);

    // Retrieve all CourseArticles
    app.get('/api/course-articles', courseArticles.findAll);

    // Retrieve a single CourseArticle with courseArticleId
    app.get('/api/course-articles/:courseArticleId', courseArticles.findOne);

    // Update a Note with courseArticleId
    app.put('/api/course-articles/:courseArticleId', courseArticles.update);

    // Delete a Note with courseArticleId
    app.delete('/api/course-articles/:courseArticleId', courseArticles.delete);

}