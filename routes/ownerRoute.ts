const expressOwner = require('express');
var routerOwner = expressOwner.Router();
const validOwner = require('../middleware/validationOwner');
const isAuthenticated2 = require('../middleware/auth2').isAuthenticated;

const ownerController = require('../controllers/owner');


routerOwner.get('/', ownerController.getAllOwners);

routerOwner.get('/:id', ownerController.getOwnerById);

routerOwner.post('/', validOwner.saveOwner, ownerController.addOwner);

routerOwner.put('/:id', validOwner.saveOwner, ownerController.updateOwner);

routerOwner.delete('/:id', validOwner.saveOwner, ownerController.deleteOwner);

export default routerOwner;