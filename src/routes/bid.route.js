const express = require('express');
const router = express.Router();
const bidController= require('../controllers/bid.controller');
const authenticate= require('../middlewares/authenticate');


router.get('/items/:itemId/bids', bidController.getBidsForItem);
router.post('/items/:itemId/bids', authenticate, authorize(['admin', 'owner']), bidController.placeBid);

module.exports = router;
