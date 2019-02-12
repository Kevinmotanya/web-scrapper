// ========== Dependcies / Requirements ==========
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ========== Devine The Articles ================
var NoteSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

// ========== Article Model ======================
var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;