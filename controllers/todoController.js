const express = require('express');
const Todo = require('../models/todo');
const { validationResult } = require("express-validator");

const addTodo = async (req, res) => {
    const {content} = req.body;
    console.log("content", content);
    try{
        const checkTodo = await Todo.findOne({content});
        if (checkTodo){
            return res.status(400).json({
                status: false,
                message: "Todo is exist"
            })
        }
        const newTodo = new Todo({
            content: content
        })
        await newTodo.save();
        await res.status(200).json({
            status: true,
            message: "create todo successfully"
        })
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }

}
const updateTodo = async (req, res)  => {
    const {_id, content} = req.body;
    try{
        const findAndTodo = await Todo.findByIdAndUpdate( _id,{content: content});
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

const deleteTodo = async (req, res) => {
    try{
        const findAndTodo = await Todo.deleteOne( _id);
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
} 
exports.addTodo = addTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;



