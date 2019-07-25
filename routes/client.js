const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

/* routes /client */
router.get('/', auth.checkToken, db.getClient);
router.get('/:username', auth.checkToken, db.getClientByUsername);
router.post('/', auth.checkToken,db.createClient);
router.put('/:username', auth.checkToken, db.updateClient);
router.delete('/:username', auth.checkToken, db.deleteClient);

module.exports = router;
