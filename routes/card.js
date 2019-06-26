const express = require('express');
const router = express.Router();
const db = require('./server/queries')

/* routes /card */
router.get('/', db.getCard);
router.get('/:id', db.getCardById);
router.post('/', db.createCard);
router.put('/:id', db.updateCard);
router.delete('/:id', db.deleteCard);

module.exports = router;
