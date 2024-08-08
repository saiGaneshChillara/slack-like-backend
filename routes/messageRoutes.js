const express = require('express');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { route } = require('./taskRoutes');
const { getMessages, sendMessage, uploadFile } = require('../controllers/chatController');

const router = express.Router();

router.route('/messages')
      .get(auth, getMessages)
      .post(auth, sendMessage);

router.route('/upload')
      .post(auth, upload.single('file'),
        uploadFile);

module.exports = router;