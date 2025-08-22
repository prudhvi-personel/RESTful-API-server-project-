const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { validateTask } = require('../middlewares/validationMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, validateTask, createTask);
router.get('/', authenticate, getTasks);
router.get('/:id', authenticate, getTaskById);
router.put('/:id', authenticate, validateTask, updateTask);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;