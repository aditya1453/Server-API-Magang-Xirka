const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname,'..','controllers','queries'))
const auth = require(path.join(__dirname,'..','controllers','auth'))

/* routes /card */
router.options('/', auth.checkToken, db.getCard);
router.get('/:id', auth.checkToken, db.getCardById);
router.post('/', db.createCard);
router.put('/:id', auth.checkToken, db.updateCard);
router.delete('/:id', auth.checkToken, db.deleteCard);

module.exports = router;
