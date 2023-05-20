const express = require('express');
var router = express.Router();

const contactCardController = require('../controllers/contactCard');

router.get('/', contactCardController.getAll);

router.get('/:id', contactCardController.getSingle);

router.post('/', contactCardController.addContacts);

router.delete('/:id', contactCardController.deleteContacts);


module.exports = router;
