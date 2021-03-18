const express = require('express');
const recipeRoute = express.Router();

// Recipe model
let RecipeModel = require('../models/Recipe');

recipeRoute.route('/').get((req, res) => {
    RecipeModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 });

recipeRoute.route('/add').post((req, res, next) => {
    RecipeModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

recipeRoute.route('/show/:id').get((req, res) => {
  RecipeModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

recipeRoute.route('/edit/:id').get((req, res) => {
   RecipeModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Update recipe
recipeRoute.route('/update/:id').post((req, res, next) => {
  RecipeModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('La recette a bien été mise à jour !')
    }
  })
});

// Delete recipe
recipeRoute.route('/delete/:id').delete((req, res, next) => {
  RecipeModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

module.exports = recipeRoute;