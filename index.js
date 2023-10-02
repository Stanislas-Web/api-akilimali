// const http = require("http");
// const app = require("./app");
// const chalk = require("chalk");
// const port = process.env.PORT || 4600;

// require('dotenv').config();
// const server = http.createServer(app);

// const db = require("./models");

// db.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     let host = `http://localhost:${port}`;
//     console.log(chalk.yellow(host));
//   });
// });




require('dotenv/config')
const app = require('./app');
const chalk = require("chalk");
const db = require("./models");


const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   let host = `http://localhost:${port}`;
//   console.log('Express server démarré sur le port ' + port + chalk.yellow(host));
// });

// db.sequelize.sync().then(() => {
  app.listen(port, () => {
    let host = `http://localhost:${port}`;
    console.log(chalk.yellow(host));
  });
// });