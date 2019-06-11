const Pool = require('pg').Pool
const pool = new Pool({
  user: 'xirka',
  host: 'localhost',
  database: 'xirkadb',
  password: 'xirka',
  port: 5432,
})

const getCard = (request, response) => {
  pool.query('SELECT * FROM card ORDER BY card_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTerminal = (request, response) => {
  pool.query('SELECT * FROM terminal ORDER BY terminal_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCardById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM card WHERE card_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTerminalById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCard = (request, response) => {
  const { card_id, nim, nama, instansi } = request.body

  pool.query('INSERT INTO card (card_id, nim, nama, instansi) VALUES ($1, $2, $3, $4)', [card_id, nim, nama, instansi], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Card added`)
  })
}

const createTerminal = (request, response) => {
  const { terminal_id, ruang, instansi } = request.body

  pool.query('INSERT INTO terminal (terminal_id, ruang, instansi) VALUES ($1, $2, $3)', [terminal_id, ruang, instansi], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Room added`)
  })
}

const deleteCard = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM card WHERE card_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Card deleted with ID: ${id}`)
  })
}

const deleteTerminal = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Room deleted with ID: ${id}`)
  })
}

module.exports = {
  getCard,
  getCardById,
  createCard,
  deleteCard,
  getTerminal,
  getTerminalById,
  createTerminal,
  deleteTerminal,
}
