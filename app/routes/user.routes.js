module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const verifySignUP = require("../middlewares/verifySignUp.js");

    // Create a new User
    app.post('/api/auth/users', [
            verifySignUP.checkUserDuplicateUsernameOrEmail
        ],
        users.create);

    // Retrieve all Users
    app.get('/api/auth/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/api/auth/users/:userId', users.findOne);

    // Update a Note with userId
    app.put('/api/auth/users/:userId', users.update);

    // Update user password
    app.put('/api/auth/user-password/:userId', users.update_password);

    // Delete a Note with userId
    app.delete('/api/auth/users/:userId', users.delete);

}