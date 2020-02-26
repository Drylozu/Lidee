const mongoose = require('mongoose');

let User = new mongoose.Schema({
  id: String
})

module.exports = mongoose.model("User", User);