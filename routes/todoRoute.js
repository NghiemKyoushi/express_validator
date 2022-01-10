const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");


router.post('/addTodo', todoController.addTodo);

router.put('/updateTodo/', todoController.updateTodo);

router.get('/delete/:id', todoController.deleteTodo);

module.exports = router;