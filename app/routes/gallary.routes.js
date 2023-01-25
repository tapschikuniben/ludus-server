module.exports = (app) => {

    var express = require('express');
    var multer = require('multer');
    var Gallery = require('./../models/gallary.model.js');

    // Save file to server storage
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/uploads');
        },
        filename: (req, file, cb) => {
            console.log(file);
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
        }
    });

    var upload = multer({ storage: storage });

    // get data by id
    app.get('/:id', function(req, res, next) {
        Gallery.findById(req.params.id, function(err, gallery) {
            if (err) return next(err);
            res.json(gallery);
        });
    });

    // post data
    app.post('/upload-file', upload.single('file'), function(req, res, next) {
        if (!req.file) {
            return res.status(500).send({ message: 'Upload fail' });
        } else {
            req.body.imageUrl = 'http://localhost:3000/uploads/' + req.file.filename;
            Gallery.create(req.body, function(err, gallery) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.json(gallery);
            });
        }
    });

}