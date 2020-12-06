const path = require('path')
const db = require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/notes', (req, res) => {
    res.sendFile('notes.html', { 
        root: path.join(__dirname, 'public') 
    })
})

app.get('/api/notes', (req, res) => {
    db.readNotes((err, notes) => {
        if (err) throw err
        res.json(notes)
    })
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    db.writeNote(note, (err, note) => {
        if (err) throw err;
        res.status(201).json(note)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id

    db.deleteNote(noteId, (err) => {
        if (err) throw err;
        res.sendStatus(200)
    })
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})