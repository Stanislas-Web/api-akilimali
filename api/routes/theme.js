const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/themes", (req, res) => {
  db.theme
    .findAll()
    .then((allTheme) => {
      return res.send(allTheme);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/themes", (req, res) => {
  db.theme
    .create({
        categorie_ouvrage: req.body.categorie_ouvrage,
    })
    .then((unTheme) => res.status(201).json(unTheme))
    .catch((err) => res.status(400).json(err));
});

router.get("/themes/:id", (req, res) => {
  db.theme
    .findAll({
      where: {
        id: Number(req.params.id)
      }
    })
    .then((unTheme) => {
      return res.send(unTheme);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

router.delete("/themes/:id", (req, res) => {
  db.theme
    .destroy({
      where: {
        id: Number(req.params.id)
      },
    })
    .then((delTheme) => {
      return res.status(200).json(delTheme);
    });
});

//nouveau endpoint pour avoir aussi le theme d'un ouvrage
router.post("/themes/:themeId/ouvrages", async (req, res) => {
  const { titre_ouvrage, description_ouvrage, image_ouvrage, pays_ouvrage, prix_ouvrage, genre_ouvrage, lien_ouvrage, nom_auteur, prenom_auteur, pays_auteur, image_auteur } = req.body;



const auteur= await   db.auteur.findOne({ where: { nom_auteur: nom_auteur } })
          .then(data => {
              if (data) {
                  return db.auteur.update({ prenom_auteur: prenom_auteur,pays_auteur:pays_auteur, image_auteur:image_auteur}, { where: { id: Number(data.id) } })
              }
              return db.auteur.create({ nom_auteur: nom_auteur, prenom_auteur: prenom_auteur,pays_auteur:pays_auteur, image_auteur:image_auteur })
          });
      
const ouvrage = await db.ouvrage.findOne({where:{titre_ouvrage:titre_ouvrage}}).then(data=>{
  if (data) {
      return db.ouvrage.update({ titre_ouvrage: titre_ouvrage,description_ouvrage:description_ouvrage, image_ouvrage:image_ouvrage, }, { where: { id:Number(data.id)  } })
  }
  return db.ouvrage.create({ titre_ouvrage: titre_ouvrage,
      description_ouvrage: description_ouvrage,
      image_ouvrage: image_ouvrage,
      lien_ouvrage: lien_ouvrage,
      pays_ouvrage: pays_ouvrage,
      prix_ouvrage: prix_ouvrage,
      genre_ouvrage: genre_ouvrage });
});
await db.theme.findOne({where:{id:Number(req.params.themeId)}}).then(theme=>{
  theme.addOuvrage(ouvrage,{ through: { selfGranted: false } });
})
await auteur.addOuvrage(ouvrage, { through: { selfGranted: false } }).then(data=>{
  return res.send(data);
}).catch(err=>res.status(404).json(err));






});


module.exports = router;