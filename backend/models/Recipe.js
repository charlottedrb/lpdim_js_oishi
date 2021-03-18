const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  note: {
    type: Number
  },
}, {
  collection: 'recipes'
})

module.exports = mongoose.model('Recipe', recipeSchema)