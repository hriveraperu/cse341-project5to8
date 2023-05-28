const express = require('express');
var router = express.Router();
const validation = require('../middleware/validation');


const contactCardController = require('../controllers/contactCard');

router.get('/', contactCardController.getAll);

router.get('/:id', contactCardController.getSingle);

router.post('/', validation.saveContact, contactCardController.addContacts);

router.put('/:id', validation.saveContact, contactCardController.updateContacts);

router.delete('/:id',  contactCardController.deleteContacts);


module.exports = router;
