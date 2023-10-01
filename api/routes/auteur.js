const express = require("express");
const router = express.Router();
const db = require("../../models");
const cors = require("cors");

router.get("/auteurs", (req, res) => {
  db.auteur
    .findAll({include:[{model:db.ouvrage}]})
    .then((allAuteur) => {
      return res.send(allAuteur);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/auteurs", (req, res) => {
  db.auteur
    .create({
        nom_auteur: req.body.nom_auteur,
        prenom_auteur: req.body.prenom_auteur,
        pays_auteur: req.body.pays_auteur,
        image_auteur: req.body.image_auteur
    })
    .then((unAuteur) => res.status(201).json(unAuteur))
    .catch((err) => res.status(400).json(err));
});

router.get("/auteurs/:id", (req, res) => {
  db.auteur
    .findAll({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((unAuteur) => {
      return res.send(unAuteur);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("auteurs/:id", (req, res) => {
  db.auteur
    .destroy({
      where: {
        id: Number(req.params.id)
      },
    })
    .then((delAuteur) => {
      return res.status(200).json(delAuteur);
    });
});

module.exports = router;