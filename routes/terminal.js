const express = require('express');
const router = express.Router();
const db = require('./server/queries')

/* routes /terminal */
router.get('/', db.getTerminal);
router.get('/:id', db.getTerminalById);
router.post('/', db.createTerminal);
router.put('/:id', db.updateTerminal);
router.delete('/:id', db.deleteTerminal);

module.exports = router;
