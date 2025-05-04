import express from 'express';
import { createTodo, deleteTodo, showTodo, updateTodo } from '../controllers/todo.controllers.js';
import { authenticate } from '../middleware/authorise.js';

const router = express.Router();

router.post('/addtodo', authenticate, createTodo);
router.get('/showtodo', authenticate, showTodo);
router.delete('/deletetodo/:id', authenticate, deleteTodo);
router.put('/updatetodo/:id', authenticate, updateTodo);

export default router;
