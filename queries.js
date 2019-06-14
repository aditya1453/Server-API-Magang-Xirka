const Pool = require('pg').Pool
const pool = new Pool({
  user: 'xirka',
  host: 'localhost',
  database: 'magangdb',
  password: 'bandung',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 5000
})

const getCard = (request, response) => {
  pool.query('SELECT * FROM card ORDER BY card_id ASC', (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
      console.log('getCard failed')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getTerminal = (request, response) => {
  pool.query('SELECT * FROM terminal ORDER BY terminal_id ASC', (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
      console.log('getTerminal failed')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getCardById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM card WHERE card_id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET by ID')
      console.log('getCardById failed')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getTerminalById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET by ID')
      console.log('getTerminalById failed')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const createCard = (request, response) => {
  const { card_id, nim, name, instansi } = request.body

  pool.query('INSERT INTO card (card_id, nim, name, instansi) VALUES ($1, $2, $3, $4)', [card_id, nim, name, instansi], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
      console.log('createCard failed')
    }
    else{
      response.status(201).send(`Card added`)
    }
  })
}

const createTerminal = (request, response) => {
  const { terminal_id, room, instansi } = request.body

  pool.query('INSERT INTO terminal (terminal_id, room, instansi) VALUES ($1, $2, $3)',
    [terminal_id, room, instansi], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
      console.log('createTerminal failed')
    }
    else{
      response.status(201).send(`Room added`)
    }
  })
}

const updateCard = (request, response) => {
  const id = parseInt(request.params.id)
  const { nim, name, instansi } = request.body

  pool.query(
    'UPDATE card set nim=($1), name=($2), instansi=($3) WHERE card_id=($4)',
    [nim, name, instansi, id],
    (error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
        console.log('updateCard failed')
      }
      else{
          response.status(200).send(`Card modified with ID: ${id}`)
      }
    }
  )
}

const updateTerminal = (request, response) => {
  const id = parseInt(request.params.id)
  const { room, instansi } = request.body

  pool.query(
    'UPDATE terminal SET room = ($1), instansi = ($2) WHERE terminal_id = ($3)',
    [room, instansi, id],
    (error, results) => {
      if (error) {
        response.status(400).send('Failed to update')
        console.log('updateTerminal failed')
      }
      else{
        response.status(200).send(`Room modified with ID: ${id}`)
      }
    }
  )
}

const deleteCard = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM card WHERE card_id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
      console.log('deleteCard failed')
    }
    else{
      response.status(200).send(`Card deleted with ID: ${id}`)
    }
  })
}

const deleteTerminal = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
    if (error) {
      response.status(400).send('Failed to delete')
      console.log('deleteTerminal failed')
    }
    else{
      response.status(200).send(`Room deleted with ID: ${id}`)
    }
  })
}

module.exports = {
  getCard,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getTerminal,
  getTerminalById,
  createTerminal,
  updateTerminal,
  deleteTerminal,
}
