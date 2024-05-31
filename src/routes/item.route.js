const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authenticate = require('../middleware/authenticate'); // Middleware for authentication
const authorize = require('../middleware/authorize'); // Middleware for authorization
const upload = require('../middleware/upload'); // Middleware for file upload

router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.post('/items', authenticate,authorize(['admin', 'owner']), upload.single('image'), itemController.createItem);
router.put('/items/:id', authenticate, authorize(['admin', 'owner']), itemController.updateItem);
router.delete('/items/:id', authenticate, authorize(['admin', 'owner']), itemController.deleteItem);

module.exports = router;
