const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  surname:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    min: 18
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  takentasks:[{
    taskid: ObjectId
  }]
});

const User = module.exports = mongoose.model('User', userSchema);
