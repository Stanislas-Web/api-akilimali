const express = require("express");
const router = express.Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const cors = require("cors");


router.get("/users", (req, res) => {

  db.user
    .findAll()
    .then((allusers) => {
      return res.send(allusers);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/users", (req, res) => {
  

  const { nom_user,role_user, prenom_user, pays_user, age_user,phone_number_user, password_user,mail_user } = req.body;
  db.user.create({
    nom_user: nom_user,
    prenom_user: prenom_user,
    pays_user: pays_user,
    age_user: age_user,
    phone_number_user: phone_number_user,
    password_user: password_user,
    role_user: role_user,
    mail_user:mail_user
    })
    .then((oneUser) => res.status(201).json(oneUser))
    .catch((err) => res.status(400).json(err));


});

router.get("/users/:id", (req, res) => {
  db.user
    .findAll({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((oneUser) => {
      return res.send(oneUser);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("users/:id", (req, res) => {
  db.user
    .destroy({
      where: {
        id: Number(req.params.id)
      },
    })
    .then((delUser) => {
      return res.status(200).json(delUser);
    });
});


router.post("/users/login", (req, res, next) => {
    db.user
      .findAll({ where: { phone_number_user: req.body.phone_number_user }})
      .then((user) => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "user non trouvé, user n existe pas",
          });
        }
        bcrypt.compare(req.body.password_user, user[0].password_user, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "authentification échouée",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
    id_user:user[0].id,
    nom_user: user[0].nom_user,
    prenom_user: user[0].prenom_user,
    pays_user: user[0].pays_user,
    age_user: user[0].age_user,
    phone_number_user: user[0].phone_number_user,
    password_user: user[0].password_user,
    role_user: user[0].role_user,
    mail_user: user[0].mail_user,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
  
            return res.status(200).json({
              message: "authentification reussie",
              token: token,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
/////=> c'est pour enregistrer une ligne de commande dans le panier d'un utilisateur
//pour enregistrer dans le panier
//on crée la commande
//on met les identifiants de l'ouvrage et de la commande dans 
router.post("/users/:userId/ouvrages/:ouvrageId/commandes",cors(), async (req,res)=>{
  
  const commande = await db.commande.create({date_commande: new Date().getDate()});
  const ligneDeCommande = await db.ligneDeCommande.create({
      commandeId: Number(commande.id),
      ouvrageId:Number(req.params.ouvrageId)
  });
  const panier = await db.panier.create({
      ligneDeCommandeId: Number(ligneDeCommande.id),
      userId: Number(req.params.userId)
  })
  
  res.status(201).json(panier);

}
);

//récuperer tous les paniers d'un utilisateur quelconque
router.get("/users/:userId/ouvrages/:ouvrageId/commandes", async (req,res)=>{


  db.panier
  .findAll({
    where: {
      userId: Number(req.params.userId)
    },
    include:{ all: true, nested: true }
  })
  .then((unPanier) => {
    return res.send(unPanier);
  })
  .catch((err) => {
    return res.status(404).json(err);
  });



}
);


module.exports = router;
