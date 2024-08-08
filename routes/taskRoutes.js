const express = require('express');

const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.route('/')
      .get(auth, getTasks)
      .post(auth, createTask);
router.route('/:taskId')
      .put(auth, updateTask)
      .delete(auth, deleteTask);

module.exports = router;
