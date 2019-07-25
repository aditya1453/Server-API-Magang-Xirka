const path = require('path');
const config = require(path.join(__dirname,'..','config'));
const Pool = require('pg').Pool

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
  max: config.max,
  idleTimeoutMillis: config.idleTimeoutMillis
})

function isNumeric(num){
  return !isNaN(num)
}

function removeSpace(str){
  return str.trim(str.replace(/\s+/g, ''))
}

function cekSpaces(str){
  var valid = /\s+/g
  return !valid.test(str)
}

const getCard = (request, response) => {
  pool.query('SELECT * FROM card ORDER BY card_id ASC', (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
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
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getClient = (request, response) => {
  pool.query('SELECT * FROM client ORDER BY username ASC', (error, results) => {
    if (error) {
      response.status(400).send('Failed to GET')
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getCardById = (request, response) => {
  var id = removeSpace(request.params.id)

  if (isNumeric(id)){
    pool.query('SELECT * FROM card WHERE card_id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET by ID')
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }else{
    response.status(400).send('Failed to GET by ID, ID is not a number')
  }
}

const getTerminalById = (request, response) => {
  var id = removeSpace(request.params.id)

  if (isNumeric(id)){
    pool.query('SELECT * FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET by ID')
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }else{
    response.status(400).send('Failed to GET by ID, ID is not a number')
  }
}

const getClientByUsername = (request, response) => {
  var username = request.params.username

  if (cekSpaces(username)){
    pool.query('SELECT * FROM client WHERE username = $1', [username], (error, results) => {
      if (error) {
        response.status(400).send('Failed to GET by username')
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }else{
    response.status(400).send('Failed to GET by username, username contain spaces')
  }
}

const createCard = (request, response) => {
  var { card_id, nim, name, instansi } = request.body

  card_id = removeSpace(card_id)
  nim = removeSpace(nim)

  if(isNumeric(card_id) && isNumeric(nim)){
    pool.query('INSERT INTO card (card_id, nim, name, instansi) VALUES ($1, $2, $3, $4)', [card_id, nim, name, instansi], (error, results) => {
      if (error) {
        response.status(400).send('Failed to create')
      }
      else{
        response.status(201).send('Card Added')
      }
    })
  }else{
    response.status(400).send('Failed to create card, card id or nim is not a number')
  }
}

const createTerminal = (request, response) => {
  var { terminal_id, room, instansi } = request.body

  terminal_id = removeSpace(terminal_id)

  if(isNumeric(terminal_id)){
    pool.query('INSERT INTO terminal (terminal_id, room, instansi) VALUES ($1, $2, $3)',
    [terminal_id, room, instansi], (error, results) => {
    if (error) {
      response.status(400).send('Failed to create')
    }
    else{
      response.status(201).send(`Room added`)
    }
  })
  }else{
    response.status(400).send('Failed to create terminal, terminal id or nim is not a number')
  }
}

const createClient = (request, response) => {
  var { username, password, name } = request.body

  if(cekSpaces(username) && cekSpaces(password)){
    pool.query('INSERT INTO client (username, password, name) VALUES ($1, $2, $3)',
    [username, password, name], (error, results) => {
      if (error) {
        response.status(400).send('Failed to create')
      }
      else{
        response.status(201).send(`Client added`)
      }
    })
  }else{
    response.status(400).send('Failed to create client, client username or password contain spaces')
  }
}

const updateCard = (request, response) => {
  var id = removeSpace(request.params.id)
  var { nim, name, instansi } = request.body

  nim = removeSpace(nim)

  if (isNumeric(id) && isNumeric(nim)){
    pool.query(
      'UPDATE card set nim=($1), name=($2), instansi=($3) WHERE card_id=($4)',
      [nim, name, instansi, id],
      (error, results) => {
        if (error) {
          response.status(400).send('Failed to update')
        }
        else{
            response.status(200).send(`Card modified with ID: ${id}`)
        }
      }
    )
  }else{
    response.status(400).send('Failed to update card, card id or nim is not a number')
  }
}

const updateTerminal = (request, response) => {
  var id = removeSpace(request.params.id)
  var { room, instansi } = request.body

  if (isNumeric(id)){
    pool.query(
      'UPDATE terminal SET room = ($1), instansi = ($2) WHERE terminal_id = ($3)',
      [room, instansi, id],
      (error, results) => {
        if (error) {
          response.status(400).send('Failed to update')
        }
        else{
          response.status(200).send(`Room modified with ID: ${id}`)
        }
      }
    )
  }else{
    response.status(400).send('Failed to update terminal, terminal id or nim is not a number')
  }
}

const updateClient = (request, response) => {
  var username = request.params.username
  var { password, name } = request.body

  if (cekSpaces(username) && cekSpaces(password)){
    pool.query(
      'UPDATE client SET password = ($1), name = ($2) WHERE username = ($3)',
      [password, name, username],
      (error, results) => {
        if (error) {
          response.status(400).send('Failed to update')
        }
        else{
          response.status(200).send(`Room modified with username: ${username}`)
        }
      }
    )
  }else{
    response.status(400).send('Failed to update client, client username or password contain spaces')
  }
}

const deleteCard = (request, response) => {
  var id = removeSpace(request.params.id)

  if (isNumeric(id)){
    pool.query('DELETE FROM card WHERE card_id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send('Failed to delete')
      }
      else{
        response.status(200).send(`Card deleted with ID: ${id}`)
      }
    })
  }else{
    response.status(400).send('Failed to delete card, card id is not a number')
  }
}

const deleteTerminal = (request, response) => {
  var id = removeSpace(request.params.id)

  if (isNumeric(id)){
    pool.query('DELETE FROM terminal WHERE terminal_id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send('Failed to delete')
      }
      else{
        response.status(200).send(`Room deleted with ID: ${id}`)
      }
    })
  }else{
    response.status(400).send('Failed to delete terminal, terminal id is not a number')
  }
}

const deleteClient = (request, response) => {
  var username = request.params.username

  if (cekSpaces(username)){
    pool.query('DELETE FROM client WHERE username = $1', [username], (error, results) => {
      if (error) {
        response.status(400).send('Failed to delete')
      }
      else{
        response.status(200).send(`Client deleted with username: ${username}`)
      }
    })
  }else{
    response.status(400).send('Failed to delete client, client username contain spaces')
  }
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
  getClient,
  getClientByUsername,
  createClient,
  updateClient,
  deleteClient
}
