const mongoose = require('mongoose');

let Guild = new mongoose.Schema({
  id: String,
  prefix: {
    type: String,
    default: 't?'
  },
  modlogs: {
    type: String,
    default: ''
  },
  mutedmembers: {
    type: Array,
    default: []
  },
  kickcount: {
    type: Number,
    default: 0
  },
  bancount: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("Guild", Guild);