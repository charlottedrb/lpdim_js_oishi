const express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database');

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected")
  },
  error => {
    console.log("DB error : " + error)
  }
)

const recipeAPI = require('../backend/routes/recipe.route')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Permet de faire un appel vers localhost:4000
app.use(cors());

// API
app.use('/api', recipeAPI)

// Port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404
// app.use((req, res, next) => {
//   next(createError(404));
// });

// gestion d'erreur
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });