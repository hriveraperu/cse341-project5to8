const express = require('express');
var router = express.Router();

const contactCardController = require('../controllers/contactCard');
const validation = require('../middleware/validate');

router.get('/', contactCardController.getAll);

router.get('/:id', contactCardController.getSingle);

router.post('/', validation.saveContact, contactCardController.addContacts);

router.put('/:id', validation.saveContact, contactCardController.updateContacts);

router.delete('/:id',  contactCardController.deleteContacts);


module.exports = router;
