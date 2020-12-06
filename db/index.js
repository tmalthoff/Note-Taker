const fs = require('fs')
const path = require('path')
const db = path.join(__dirname, 'db.json') 

function readNotes(callback) {
    fs.readFile(db, (err, data) => {
        if (err) return callback(err)

        const notes = JSON.parse(data).map((note, index) => {
            note.id = index;
            return note;
        })

        callback(null, notes)
    })
}

function writeNote(note, callback) {
    fs.readFile(db, (err, data) => {
        if (err) return callback(err);

        const notes = JSON.parse(data)
        notes.push(note)

        fs.writeFile(db, JSON.stringify(notes), (err) => {
            if (err) return callback(err);
            callback(null, note)
        })
    })
}

function deleteNote(noteId, callback) {
    fs.readFile(db, (err, data) => {
        if (err) return callback(err);

        const notes = JSON.parse(data).filter((note, index) => index != noteId)

        fs.writeFile(db, JSON.stringify(notes), (err) => {
            if (err) return callback(err);
            callback(null)
        })
    })
}

module.exports = { readNotes, writeNote, deleteNote }