const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const rateSchema = mongoose.Schema({
  userid:{
    type: ObjectId,
    required: true
  },
  total:{
    type: Number,
    required: true
  },
  rating:{
    type: Number,
    required: true
  }
});

const Rate = module.exports = mongoose.model('Rate', rateSchema);
