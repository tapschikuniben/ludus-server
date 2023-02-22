const User = require('../models/user.model.js');

checkUserDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        email_address: req.body.email_address
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }

        // Email
        User.findOne({
            email_address: req.body.email_address
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};


const verifySignUp = {
    checkUserDuplicateUsernameOrEmail
};

module.exports = verifySignUp;