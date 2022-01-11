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
            content: content,
            complete: false
        })
        await newTodo.save();
        console.log("---------------------")
        const findAll = await Todo.find({});
        await res.status(200).json(findAll);
        console.log("done")
    }catch(error){
        // await res.status(500).json({
        //     status: false,
        //     message: "Internal Server Error"
        // })
        console.log(error);
    }

}
const updateTodo = async (req, res)  => {
    const {_id, content} = req.body;
    try{
        const findAndTodo = await Todo.findByIdAndUpdate( _id,{content: content});
        const findAll = await Todo.find({});
        await res.status(200).json(findAll)
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

const deleteTodo = async (req, res) => {
    try{
        const findAndTodo = await Todo.deleteOne(req.body);
        const findAll = await Todo.find({});
        await res.status(200).json(findAll)
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
} 
const getAllTodo = async (req, res) => {
    try{
        const findAll = await Todo.find({});
        return res.json(findAll);
    }catch(error){
        await res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}
const isCompleted = async(req, res) => {
    try{
        const findAndTodo = await Todo.findByIdAndUpdate( req.body._id,{complete: req.body.complete});
        const findAll = await Todo.find({});
        return res.json(findAll);
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
exports.getAllTodo = getAllTodo;
exports.isCompleted = isCompleted;



