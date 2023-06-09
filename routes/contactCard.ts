const expressContact = require('express');
var routerContact = expressContact.Router();
const validation = require('../middleware/validation');
const isAuthenticated = require('../middleware/auth').isAuthenticated;

const contactCardController = require('../controllers/contactCard');

routerContact.get('/', contactCardController.getAll);

routerContact.get('/:id', contactCardController.getSingle);

routerContact.use(isAuthenticated);

routerContact.post('/', validation.saveContact, contactCardController.addContacts);

routerContact.put('/:id', validation.saveContact, contactCardController.updateContacts);

routerContact.delete('/:id',  contactCardController.deleteContacts);


module.exports = routerContact;
