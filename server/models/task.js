const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  datetime:{
    type: Date,
    required: true
  },
  istaken:{
    type: Boolean,
    required: true
  }  
});

const Task = module.exports = mongoose.model('Task', taskSchema);
