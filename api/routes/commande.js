const express = require("express");
const router = express.Router();
const db = require("../../models");
const cors = require("cors");

router.get("/commandes", (req, res) => {
  db.commande
    .findAll()
    .then((allCommande) => {
      return res.send(allCommande);
    })
    .catch((err) => res.status(404).json(err));
});



router.post("/commandes", async (req, res) => {

 await db.commande
    .create({
        date_commande: new Date(),
    })
    .then((uneCommande) => res.status(201).json(uneCommande))
    .catch((err) => res.status(400).json(err));
});

router.get("/commandes/:id", (req, res) => {
  db.commande
    .findAll({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((uneCommande) => {
      return res.send(uneCommande);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("commandes/:id", (req, res) => {
  db.commande
    .destroy({
      where: {
        id: Number(req.params.id)
      },
    })
    .then((delCommande) => {
      return res.status(200).json(delCommande);
    });
});

module.exports = router;