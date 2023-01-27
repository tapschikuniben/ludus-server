module.exports = (app) => {
    const packs = require('../controllers/pack.controller.js');

    // Create a new Pack
    app.post('/api/packs', packs.create);

    // Retrieve all Packs
    app.get('/api/packs', packs.findAll);

    // Retrieve a single Pack with packId
    app.get('/api/packs/:packId', packs.findOne);

    // Update a Note with packId
    app.put('/api/packs/:packId', packs.update);

    // Delete a Note with packId
    app.delete('/api/packs/:packId', packs.delete);

}