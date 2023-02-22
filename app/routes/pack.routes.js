module.exports = (app) => {
    const packs = require('../controllers/pack.controller.js');

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

    // Create a new Pack
    app.post('/api/packs', packs.create);

    // Retrieve all Packs
    app.get('/api/packs', packs.findAll);

    // Retrieve a single Pack with packId
    app.get('/api/packs/:packId', packs.findOne);

    // Update a Pack with packId
    app.put('/api/packs/:packId', packs.update);

    // Update a Daily Pack session with packId
    app.put('/api/packs-file-image/:packId', upload.single('packimage'), packs.updateFile);

    app.put('/api/packs-file-video/:packId', upload.single('packvideo'), packs.updateFile);

    app.delete('/api/packs/:packId', packs.delete);

}