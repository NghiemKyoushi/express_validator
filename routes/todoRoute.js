const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");


router.post('/addTodo', todoController.addTodo);

router.put('/updateTodo', todoController.updateTodo);

router.post('/delete', todoController.deleteTodo);

router.get('/findAll', todoController.getAllTodo);

router.put('/checkComplete', todoController.isCompleted);
module.exports = router;