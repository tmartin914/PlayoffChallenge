module.exports = app => {
  const players = require("../controllers/controller.js");

  var router = require("express").Router();

  router.get("/", players.findAll);
  router.get("/load", players.populateTable);
  router.post("/submitLineup", players.submitLineup);

  app.use('/api/players', router);
};