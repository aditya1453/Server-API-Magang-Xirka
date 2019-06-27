const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

/* routes /terminal */
router.get('/', auth.checkToken, db.getTerminal);
router.get('/:id', auth.checkToken, db.getTerminalById);
router.post('/', auth.checkToken,db.createTerminal);
router.put('/:id', auth.checkToken, db.updateTerminal);
router.delete('/:id', auth.checkToken, db.deleteTerminal);

module.exports = router;
