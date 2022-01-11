const mongoose = require('mongoose');
const {Schema} =mongoose;

const TodoSchema = new Schema({
    content: {
        type: String,
        unique: true,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('todo',TodoSchema);