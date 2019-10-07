const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reportSchema = mongoose.Schema({
  taskid:{
    type: ObjectId,
    required: true
  },
  userid:{
    type: ObjectId,
    required: true
  },
  rating:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  }
});

const Report = module.exports = mongoose.model('Report', reportSchema);
