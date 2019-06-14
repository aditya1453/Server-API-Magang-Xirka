const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Server API database tugas KP' })
})

//accessing card
app.get('/card', db.getCard)
app.post('/card', db.createCard)
app.get('/card/:id', db.getCardById)
app.put('/card/:id', db.updateCard)
app.delete('/card/:id', db.deleteCard)

//accessing terminal
app.get('/terminal', db.getTerminal)
app.post('/terminal', db.createTerminal)
app.get('/terminal/:id', db.getTerminalById)
app.put('/terminal/:id', db.updateTerminal)
app.delete('/terminal/:id', db.deleteTerminal)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
