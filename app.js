const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./api/routes/user");
const auteur=require("./api/routes/auteur");
const theme=require("./api/routes/theme");
const ouvrage=require("./api/routes/ouvrage");
const commande=require("./api/routes/commande");
const orangeApi=require("./api/routes/orangeMoneyApi");
const checkAuth=require('./api/middleware/check-auth');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//app.use(bodyParser({limit: '12MB'}))



app.use('/uploads',express.static('uploads'));
//app.use(express.static(__dirname));


app.use("",user);
app.use("",auteur);
app.use("",theme);
app.use("",ouvrage);
app.use("",orangeApi);
app.use("",commande);
//app.use("",contenu);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
