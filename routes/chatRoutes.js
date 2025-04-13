const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.sendChat);
router.post('/lists', chatController.getAllChats);
router.delete('/lists/:id', chatController.deleteChat);

module.exports = router;