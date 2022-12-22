const notesRouter = require('express').Router()
const Note = require('../models/note')

// notesRouter.get('/', (request, response) => {
//     response.send('<h1>Hello World</h1>')
// })  

notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    })
    .catch(error =>  next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    const note = {
        content: body.content,
        important: body.important 
    }

    Note.findById(
        request.params.id, 
        { content, important },
        { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

notesRouter.post('/', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter