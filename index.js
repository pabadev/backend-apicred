const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

let notes = [ // Ejemplo de datos temporales
  {
    id: 1,
    content: 'crear app prestamos',
    date: '2022-02-01',
    important: true
  },
  {
    id: 2,
    content: 'aprender frontend',
    date: '2022-02-01',
    important: true
  },
  {
    id: 3,
    content: 'repasar css',
    date: '2022-02-01',
    important: true
  }
]

app.use(cors())
app.use(express.json()) // Middleware para parsear el body en POST
app.use(logger)

//= =========== Solicitudes Http ===================

app.get('/', (request, response) => { // Solicita Home
  response.send('<h1>Hola mundo<h1>')
})

app.get('/api/notes', (request, response) => { // Solicita todos los registros
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => { // Solicita por ID
  const id = Number(request.params.id)
  const note = notes.find(x => x.id === id)
  console.log(id, note)
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => { // Elimina por ID
  const id = Number(request.params.id)
  notes = notes.filter(x => x.id !== id)
  console.log(id, notes)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => { // Inserta un registro
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }
  console.log(note)
  response.status(201).json(note)
  const ids = notes.map(x => x.id)
  const newId = Math.max(...ids) + 1
  const newNote = {
    id: newId,
    content: note.content,
    date: new Date().toISOString(),
    important: note.important ? note.important : false
  }
  notes = notes.concat(newNote)
  console.log(notes)
})
//= =====================================================

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto ${PORT}`)
})
//= =====================================================
