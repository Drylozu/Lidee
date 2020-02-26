const mongoose = require('mongoose');

let Guild = new mongoose.Schema({
  id: String,
  prefix: {
    type: String,
    default: 't?'
  }
})

module.exports = mongoose.model("Guild", Guild);