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
  image: {
    type: String,
  },
  units: {
    type: Number
  }, 
  time: {
    type: String
  }, 
  likes: {
    type: Number
  },
  ingredients: {
    type: Array
  }, 
  steps: {
    type: Array
  }, 
}, {
  collection: 'recipes'
})

module.exports = mongoose.model('Recipe', recipeSchema)